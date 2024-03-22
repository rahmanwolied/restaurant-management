import { Link } from 'react-router-dom';
export function Logo() {
	return (
		<div className="flex-1">
			<Link to="/">
				<div className="flex justify-center items-center mx-4">
					<img src="\assets\icons\medicine.png" alt="" className="w-10" />
					<h1 className="btn btn-ghost normal-case text-2xl text-[#F63D53] font-extrabold font-['Righteous']">HnH Foods</h1>
				</div>
			</Link>
		</div>
	);
}
