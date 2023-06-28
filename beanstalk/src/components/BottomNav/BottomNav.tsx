import './bottomNav.css'

function BottomNav() {
    return (
        <nav className="bottom-nav" data-nav="">
            <ul className="bav-list">
                <li className="bav-item">
                    <a href="#" className="bav-btn">
                        <img className="bav-item-icon" src="icons/search-nav.svg" width="30px"/>
                        <span className="bav-item-text">Search</span>
                    </a>
                </li>
                <li className="bav-item">
                    <a href="#" className="bav-btn">
                        <img className="bav-item-icon" src="icons/dashboard-nav.svg" width="30px"/>
                        <span className="bav-item-text">Dashboard</span>
                    </a>
                </li>
                <li className="bav-item">
                    <a href="#" className="bav-btn">
                        <img className="bav-item-icon" src="icons/simulation-nav.svg" width="30px"/>
                        <span className="bav-item-text">Simulation</span>
                    </a>
                </li>
                <li className="bav-item">
                    <a href="#" className="bav-btn">
                        <img className="bav-item-icon" src="icons/profile-nav.svg" width="30px"/>
                        <span className="bav-item-text">Profile</span>
                    </a>
                </li>
            </ul>
	    </nav>
    )
}

export default BottomNav;