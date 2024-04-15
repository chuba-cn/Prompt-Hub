'use client'

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);

  //Search states
  const [searchText, setSearchText] = useState(''); 
  const [searchTextTimeout, setSearchTextTimeout] = useState(null);
  const [searchedTextResult, setSearchedTextResult] = useState([]);

  const filterPrompts = (searchquery) => {
    const regex = new RegExp(searchquery, 'i'); // 'i' flag for case-insensitive search
    return posts.filter((post) => {
      return regex.test(post.creator.username) ||
             regex.test(post.tag) ||
             regex.test(post.prompt);
    });
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTextTimeout);
    setSearchText(e.target.value);

    //debounce searching
    setSearchTextTimeout(
      setTimeout(() => {
        const result = filterPrompts(e.target.value);
        setSearchedTextResult(result);
      }, 1000)
    )
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const result = filterPrompts(tag)
    setSearchedTextResult(result);
  }

  const fetchPosts = async () =>{
    const response = await fetch('api/prompt');
    const data = await response.json();

    setPosts(data);
  };
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, prompt or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Display all Prompts */}
      {searchText ? ( // If search text exists in state (via text input field), display searched results
        <PromptCardList
        data={searchedTextResult}
        handleTagClick={handleTagClick}
      />
      ) : (
        <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
      )}
    </section>
  )
}

export default Feed