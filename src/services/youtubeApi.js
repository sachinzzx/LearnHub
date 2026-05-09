const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const formatViews = (views) => {
  if (!views) return '0 views';
  const num = parseInt(views, 10);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M views';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K views';
  return num + ' views';
};

export const searchYouTubeVideos = async (query) => {
  if (!query) return [];
  if (!API_KEY) {
    console.error("YouTube API Key is missing!");
    throw new Error("YouTube API key is missing. Please check your .env file.");
  }

  try {
    
    const searchRes = await fetch(
      `${BASE_URL}/search?part=snippet&maxResults=6&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
    );
    
    if (!searchRes.ok) {
      const errorData = await searchRes.json();
      throw new Error(errorData.error?.message || `YouTube Search API error: ${searchRes.status}`);
    }
    
    const searchData = await searchRes.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    const statsRes = await fetch(
      `${BASE_URL}/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
    );

    if (!statsRes.ok) {
      throw new Error(`YouTube Videos API error: ${statsRes.status}`);
    }

    const statsData = await statsRes.json();

    return statsData.items.map(video => {
      
      const levels = ['Beginner', 'Intermediate', 'Advanced'];
      
      const hash = video.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const assignedLevel = levels[hash % 3];

      return {
        id: `yt-${video.id}`,
        originalId: video.id,
        type: 'youtube', 
        title: video.snippet.title,
        description: video.snippet.description,
        channelName: video.snippet.channelTitle,
        publishDate: video.snippet.publishedAt,
        views: formatViews(video.statistics.viewCount),
        rawViews: parseInt(video.statistics.viewCount, 10) || 0, 
        url: `https://www.youtube.com/watch?v=${video.id}`,
        image: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url,
        category: 'YouTube Video', 
        level: assignedLevel 
      };
    });
    
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    throw error; 
  }
};
