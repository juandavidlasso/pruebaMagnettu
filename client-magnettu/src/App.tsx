import { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts')
        const data = await response.json()
        setPosts(data.data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    getPosts()
  }, [])

  return (
    <div className='bg-[#30527C] w-screen h-screen p-3 flex justify-center' style={{
      backgroundImage:'linear-gradient(#0b192e,#3a4b64)'
    }}>
      <div className='w-full mt-3'>
        <h1 className='text-white font-bold text-center text-7xl!'>Posts generados</h1>
        <div className='w-full p-6 grid grid-cols-1 md:grid-cols-4 gap-6 mt-3'>
          {posts?.length === 0 ? (
            <p className='text-white text-2xl'>No hay posts generados</p>
          ) : (
            posts.map((post:any) => (
              <div key={post._id} className='bg-white p-4 rounded-lg shadow-md gap-2 flex flex-col'>
                <h2 className='text-3xl font-bold text-[#ff007a]'>Post</h2>
                <p>{post.linkedinPost}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
