import { Logo } from '../../components/Logo';

const Sidebar = () => {
	return (
		<div className="fixed bottom-0 h-full w-60 bg-green-900 transition-all duration-500 ease-in-out">
			<div className="h-20 flex items-center pl-4">
				<Logo />
			</div>
			<ul className="mt-4">
				<li>
					<a href="#" className="flex items-center px-4 py-2 text-white hover:bg-green-800 active:bg-green-700">
						<i className="bx bx-grid-alt"></i>
						<span className="ml-2">Dashboard</span>
					</a>
				</li>
				<li>
					<a href="index.php" className="flex items-center px-4 py-2 text-white hover:bg-green-800 active:bg-green-700">
						<i className="bx bx-log-out"></i>
						<span className="ml-2">Log out</span>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
