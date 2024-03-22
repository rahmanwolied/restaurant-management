import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export function Logo() {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, []);
	return (
		<div className="flex-1">
			<Link to="/">
				<div className="flex justify-center items-center mx-4">
					<img
						src="https://raw.githubusercontent.com/TahiaHossain/HnH/main/frontend/public/assets/icons/food.png"
						alt=""
						className="w-10"
					/>
					<h1
						className={`btn btn-ghost normal-case text-2xl ${
							currentPath === '/admin' ? 'text-white' : 'text-[#F63D53]'
						} font-extrabold font-['Righteous']`}>
						HnH Foods
					</h1>
				</div>
			</Link>
		</div>
	);
}
