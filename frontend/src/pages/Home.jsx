import { Link } from 'react-router-dom';
const Banner = () => {
	return (
		<div className="header">
			<div className="banner">
				<div className="hero-text">
					<h1>Get your medicine from PharmAir</h1>
					<p>Experience the convenience of PharmAir - your trusted partner for timely prescription deliveries.</p>
				</div>
				<Link className="get-started" to="/signup">
					Get Started
				</Link>
			</div>
		</div>
	);
};

function Home() {
	return (
		<>
			<Banner />
		</>
	);
}

export default Home;
