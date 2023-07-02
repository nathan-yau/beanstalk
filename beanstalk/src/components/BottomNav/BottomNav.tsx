import './bottomNav.css'

function BottomNav({authorized}: {authorized: boolean}) {
    const guestUser = [['Search', 'icons/search-nav.svg', "/search"],['Login','icons/login-nav.svg', "/signin"],['Register','icons/register-nav.svg', "/register"]]
    const authUser = [['Search','icons/search-nav.svg', "/search"],['Dashboard','icons/dashboard-nav.svg',"/dashboard"],['Simulation','icons/simulation-nav.svg',"/trading"],['Profile','icons/profile-nav.svg',"/profile"]]

    return (
        <nav className="bottom-nav" data-nav="">
            <ul className="bav-list">
            {authorized? authUser.map((element, _) => {
                return (
                <li className="bav-item" key={element[0]}>
                    <a href={element[2]} className="bav-btn">
                        <img className="bav-item-icon" src={element[1]} width="30px"/>
                        <span className="bav-item-text">{element[0]}</span>
                    </a>
                </li>
            )}):guestUser.map((element, _) => {
                return (
                <li className="bav-item" key={element[0]}>
                    <a href={element[2]} className="bav-btn">
                        <img className="bav-item-icon" src={element[1]} width="30px"/>
                        <span className="bav-item-text">{element[0]}</span>
                    </a>
                </li>
            )})}
            </ul>
	    </nav>
    )
}

export default BottomNav;