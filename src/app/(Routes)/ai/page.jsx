"use client"
import { useState } from 'react';

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

 
  const handleGenerateImage = async () => {
    if (!imagePrompt || !imageStyle || !aspectRatio) return alert('Please fill all fields');
    setLoadingImage(true);
    setImageResult(''); 

    try {
      const res = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          style: imageStyle,
          aspectRatio: aspectRatio
        }),
      });

      const data = await res.json();

      if (res.ok && data.base64Image && data.mimeType) {
        const imgDataURL = `data:${data.mimeType};base64,${data.base64Image}`;
        setImageResult(imgDataURL);
      } else {
        alert(data.message || 'Failed to generate image');
        setImageResult('');
      }
    } catch (err) {
      console.error(err);
      alert('Error generating image');
      setImageResult('');
    }
    setLoadingImage(false);
  };
 
  const handleDownloadImage = () => {
    if (!imageResult) return;
    const link = document.createElement('a');
    link.href = imageResult;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          disabled={loadingArticle}
        >
          {loadingArticle ? 'Generating...' : 'Generate Content'}
        </button>
        {articleResult && (
          <textarea
            readOnly
            value={articleResult}
            rows={15}
            className="w-full mt-4 border rounded p-3 font-mono text-sm"
          />
        )}
      </div>

      {/* Image Section */}
      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Generate Article Images
          <span className="text-sm font-normal text-gray-500 ml-2">(Powered by Pollinations.ai)</span>
        </h2>
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
            <option value="cinematic">Cinematic</option>
            <option value="anime">Anime</option>
            <option value="digital art">Digital Art</option>
          </select>
          <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="flex-1 border rounded px-3 py-2">
            <option value="">Aspect ratio</option>
            <option value="1:1">1:1 (Square)</option>
            <option value="16:9">16:9 (Landscape)</option>
            <option value="4:3">4:3 (Standard)</option>
          </select>
        </div>
        <button
          onClick={handleGenerateImage}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
          disabled={loadingImage}
        >
          {loadingImage ? 'Generating Image...' : 'Generate Image'}
        </button>
 
        {loadingImage && (
          <div className="mt-4 text-center text-gray-600">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="mt-2">Creating your image...</p>
          </div>
        )}
 
        {imageResult && !loadingImage && (
          <div className="mt-4">
            <img
              src={imageResult}
              alt="Generated"
              className="w-full rounded border shadow-lg"
              onError={() => alert('Failed to load image')}
            />
            <button
              onClick={handleDownloadImage}
              className="mt-3 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}