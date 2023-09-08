import { useState } from "react";
import { Link } from "react-router-dom";
import { SignOutButton, useAuth } from "@clerk/clerk-react";

const Home = ({ socket }) => {
    const { isLoaded, userId } = useAuth();
    const [write, setWrite] = useState(false);
    const writeFunction = () => setWrite(true);

    const handleSubmit = () => {
        console.log({ message: "Submit Clicked!", userId });
        setWrite(false);
    };

    // In case the user signs out while on the page.
    if (!isLoaded || !userId) {
        return null;
    }

    return (
        <div>
            <nav className='navbar'>
                <Link to='/' className='logo'>
                    Mingle
                </Link>
                <SignOutButton signOutCallback={() => console.log("Signed out!")}>
                    <button className='signOutBtn'>Sign out</button>
                </SignOutButton>
            </nav>

            {!write ? (
                <main className='chat'>
                    <div className='chat__body'>
                        <div className='chat__content'>
                            {/**-- contains chat messages-- */}
                        </div>
                        <div className='chat__input'>
                            <div className='chat__form'>
                                <button className='createBtn' onClick={writeFunction}>
                                    Write message
                                </button>
                            </div>
                        </div>
                    </div>
                    <aside className='chat__bar'>
                        <h3>Active users</h3>
                        <ul>
                            <li>David</li>
                            <li>Dima</li>
                        </ul>
                    </aside>
                </main>
            ) : (
                <main className='editor'>
                    <header className='editor__header'>
                        <button className=' editorBtn' onClick={handleSubmit}>
                            SEND MESSAGE
                        </button>
                    </header>

                    <div className='editor__container'>Your editor container</div>
                </main>
            )}
        </div>
    );
};

export default Home;