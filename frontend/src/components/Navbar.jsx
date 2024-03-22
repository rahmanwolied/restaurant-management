import { Logo } from './Logo';
import LoginModal from './LoginModal';
import CartDropdown from './CartDropdown';
import { Link } from 'react-router-dom';
import UserIcon from './UserIcon';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
	const { user } = useAuthContext();

	return (
		<div className="navbar bg-base-100 shadow-md">
			<Logo />
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1 items-center">
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					{user && user.user.isAdmin && (
						<li>
							<Link to="/admin">Admin</Link>
						</li>
					)}
					{!user && (
						<div className="flex justify-center items-center">
							<li>
								<Link to="/signup">Sign Up</Link>
							</li>
							<LoginModal />
						</div>
					)}
					{user && (
						<div className="flex justify-center items-center">
							<h1 className="mx-3">{user.user.name}</h1>
							<CartDropdown />
							<UserIcon />
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
