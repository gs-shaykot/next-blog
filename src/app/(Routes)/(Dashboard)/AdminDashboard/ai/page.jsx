"use client"
import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { Roboto } from 'next/font/google';
import { BsFeather } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import axios from 'axios';

const roboto = Roboto({
    subsets: ['bold'],
    weight: ['600'],
});

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
    const [uploading, setUploading] = useState(false);
    const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
    
    console.log(cloudinaryUrl)

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
        setCloudinaryUrl(null);

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

    const handleUploadToCloudinary = async () => {
        if (!imageResult) return alert("No image to upload!");

        setUploading(true);
        try {
            // Convert base64 to Blob for upload
            const response = await fetch(imageResult);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append("file", blob);
            formData.append(
                "upload_preset",
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
            );

            const Img_Res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );

            const imageLink = Img_Res.data.secure_url;
            setCloudinaryUrl(imageLink);
            alert("Image uploaded successfully to Cloudinary!");
        } catch (err) {
            console.error("Cloudinary Upload Error:", err);
            alert("Failed to upload image to Cloudinary.");
        } finally {
            setUploading(false);
        }
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
        <div>
            {/* top title & subtitle */}
            < div className='border-b border-gray-600 bg-white p-6' >
                <div className='flex items-center gap-2 mb-3'>
                    <BrainCircuit className='w-8 h-8 text-blue-600' />
                    <h2 className={`${roboto.className}  text-2xl font-bold`}>AI Content Creation</h2>
                </div>
                <p className='text-gray-700'>Generate blog content and images using AI</p>
            </div >

            <div className="w-full mx-auto space-y-12 bg-white p-6">
                {/* Article Section */}
                <div className="border rounded-lg p-6 shadow-sm w-11/12 mx-auto">
                    <div className='flex items-center gap-2 mb-3'>
                        <BsFeather className='w-6 h-6 text-purple-600' />
                        <h2 className={`${roboto.className}  text-xl font-bold`}>Generate Article Content</h2>
                    </div>
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
                <div className="border rounded-lg p-6 shadow-sm w-11/12 mx-auto">
                    <div className='flex items-center gap-2 mb-3'>
                        <FaImage className='w-6 h-6 text-green-600' />
                        <h2 className={`${roboto.className}  text-xl font-bold`}>Generate Article Content <span className='text-xs text-gray-600'>(Free tier limit: Image generation may fail. Please try again.)</span></h2>
                    </div>
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
                            <div className='flex justify-between items-center gap-3'>
                                <button
                                    onClick={handleDownloadImage}
                                    className="mt-3 w-full md:w-6/12 bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition-colors"
                                >
                                    Download Image
                                </button>
                                <button
                                    onClick={handleUploadToCloudinary}
                                    disabled={uploading}
                                    className="mt-3 w-full md:w-6/12 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded py-2 transition-all"
                                >
                                    {uploading ? "Uploading..." : "Upload to Cloudinary"}
                                </button>
                            </div>
                            <button
                                type="button"
                                className="w-full font-medium transition-all duration-200 cursor-pointer whitespace-nowrap rounded  border-2 border-blue-600 text-blue-600 bg-blue-600 text-white py-1.5 mt-4"
                            >
                                Transfer into Editor
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}