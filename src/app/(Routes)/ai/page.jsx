"use client";
import { useState } from "react";

const STABILITY_API_KEY = process.env.NEXT_PUBLIC_STABILITY_API_KEY;  

export default function AIContentCreator() {
  const [articleTitle, setArticleTitle] = useState('');
  const [tone, setTone] = useState('');
  const [length, setLength] = useState('');
  const [articleResult, setArticleResult] = useState('');

  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStyle, setImageStyle] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
  const [imageResult, setImageResult] = useState('');

  const [loadingArticle, setLoadingArticle] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  // Generate Article
  const handleGenerateArticle = async () => {
    if (!articleTitle || !tone || !length) return alert('Please fill all fields');
    setLoadingArticle(true);
    try {
      const res = await fetch('/api/ai/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: articleTitle, tone, length }),
      });
      const data = await res.json();
      if (res.ok) setArticleResult(data.article);
      else alert(data.message || 'Failed to generate article');
    } catch (err) {
      console.error(err);
      alert('Error generating article');
    }
    setLoadingArticle(false);
  };

  // Stability AI Image Generation
  async function generateImage(promptText, style, ratio) {
    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${promptText}, style: ${style}`,
          aspect_ratio: ratio || "1:1",
          output_format: "png",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Stability AI API error: ${response.statusText}`);
    }

    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob); // Convert blob to URL for <img>
  }

  const handleGenerateImage = async () => {
    if (!imagePrompt || !imageStyle || !aspectRatio) return alert('Please fill all fields');
    setLoadingImage(true);
    try {
      const imgURL = await generateImage(imagePrompt, imageStyle, aspectRatio);
      setImageResult(imgURL);
    } catch (err) {
      console.error(err);
      alert('Error generating image');
    }
    setLoadingImage(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Article Section */}
      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Generate Article Content</h2>
        <input
          type="text"
          placeholder="Enter article title..."
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <div className="flex gap-3 mb-3">
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="flex-1 border rounded px-3 py-2">
            <option value="">Select tone</option>
            <option value="professional">Professional</option>
            <option value="academic">Academic</option>
            <option value="creative">Creative</option>
            <option value="casual">Casual</option>
          </select>
          <select value={length} onChange={(e) => setLength(e.target.value)} className="flex-1 border rounded px-3 py-2">
            <option value="">Article length</option>
            <option value={200}>200 words</option>
            <option value={500}>500 words</option>
            <option value={1000}>1000+ words</option>
          </select>
        </div>
        <button
          onClick={handleGenerateArticle}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loadingArticle}
        >
          {loadingArticle ? 'Generating...' : 'Generate Content'}
        </button>
        {articleResult && (
          <textarea
            readOnly
            value={articleResult}
            rows={15}
            className="w-full mt-4 border rounded p-3"
          />
        )}
      </div>

      {/* Image Section */}
      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Generate Article Images</h2>
        <input
          type="text"
          placeholder="Describe the image..."
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <div className="flex gap-3 mb-3">
          <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)} className="flex-1 border rounded px-3 py-2">
            <option value="">Image style</option>
            <option value="photorealistic">Photorealistic</option>
            <option value="illustration">Illustration</option>
            <option value="abstract">Abstract</option>
            <option value="minimalistic">Minimalistic</option>
          </select>
          <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="flex-1 border rounded px-3 py-2">
            <option value="">Aspect ratio</option>
            <option value="1:1">1:1</option>
            <option value="16:9">16:9</option>
            <option value="4:3">4:3</option>
          </select>
        </div>
        <button
          onClick={handleGenerateImage}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          disabled={loadingImage}
        >
          {loadingImage ? 'Generating...' : 'Generate Image'}
        </button>
        {imageResult && (
          <img src={imageResult} alt="Generated" className="mt-4 w-full rounded border" />
        )}
      </div>
    </div>
  );
}
