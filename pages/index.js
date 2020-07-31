import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Home = ({blogs}) => {
  return (
    <div>
      <h3>JamStackの練習　確認＊＊＊</h3>
      <hr color="#0000ff" size="2"></hr>
      <div>
        {blogs.map(blog => (
          <React.Fragment key={blog.id}>
            <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
              <a>
                <u><h2>{blog.title}</h2></u>
              </a>
            </Link>
            {blog.tags.map(tag => (
              <React.Fragment key={tag.id}>
                <span>{tag.name}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {headers: {'X-API-KEY': process.env.API_KEY},};
  //const key = {headers: {'X-API-KEY': 'ea2e025b-42d6-4539-a52a-2af9395b18e3'}};
  
  const res = await fetch(`https://test_200729.microcms.io/api/v1/blogs`, key);
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    }
  }
};

export default Home;
