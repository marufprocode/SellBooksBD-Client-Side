import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Blogs = () => {
	const blogs = useLoaderData();
    return (
        <div className="dark:bg-gray-300 dark:text-gray-700 p-10">
	<div className="container grid grid-cols-12 mx-auto" data-aos="zoom-in">
		<div className="flex flex-col justify-center col-span-12 align-middle bg-no-repeat bg-cover dark:bg-gray-700 lg:col-span-6 lg:h-auto bg-[url('https://d27fp5ulgfd7w2.cloudfront.net/wp-content/uploads/2019/01/08160759/tech-blogs-1.jpg')]">
			{/* <div className="flex flex-col items-center p-8 py-12 text-center text-white">
				<span>27 November, 2022</span>
				<h1 className="py-4 text-5xl font-bold">What are the different ways to manage a state in a React application?</h1>
				<p className="pb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
					<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
				</svg>
			</div> */}
		</div>
		<div className="flex flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-10 divide-gray-700">
			{
				blogs?.map(blog => (
					<div className="pt-6 pb-4 space-y-2" key={blog._id}>
					<span>{blog.date}</span>
						<h1 className="text-2xl font-bold">{blog.title}</h1>
						<p>{blog.article.slice(0, 100)}...</p>
						<Link to={`/blog/${blog._id}`} rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm dark:text-violet-400">
							<span>Read more</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
								<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
							</svg>
						</Link>
					</div>
				))
			}
		</div>
	</div>
</div>
    );
};

export default Blogs;