import './index.css';

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <div className="nav-item">
                <i className="fas fa-home"></i>
                <span>Home</span>
            </div>
            <div className="nav-item">
                <i className="fas fa-search"></i>
                <span>Search</span>
            </div>
            <div className="nav-item">
                <i className="fas fa-shopping-cart"></i>
                <span>Cart</span>
            </div>
            <div className="nav-item">
                <i className="fas fa-user"></i>
                <span>Profile</span>
            </div>
        </div>
    );
};

export default BottomNav;
