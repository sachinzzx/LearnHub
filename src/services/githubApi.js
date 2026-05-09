
export const searchGithubRepos = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=6`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();

    return (data.items || []).map(repo => {
      
      const levels = ['Beginner', 'Intermediate', 'Advanced'];
      const assignedLevel = levels[repo.id % 3];

      return {
        id: `gh-${repo.id}`,
        originalId: repo.id,
        type: 'github',
        title: repo.name,
        description: repo.description || 'No description available.',
        category: 'GitHub Repository',
        url: repo.html_url,
        owner: repo.owner.login,
        avatar: repo.owner.avatar_url,
        stars: repo.stargazers_count,
        rawStars: repo.stargazers_count, 
        forks: repo.forks_count,
        language: repo.language || 'Multiple',
        publishDate: repo.updated_at, 
        level: assignedLevel
      };
    });
  } catch (error) {
    console.error("Failed to fetch from GitHub:", error);
    throw error; 
  }
};
