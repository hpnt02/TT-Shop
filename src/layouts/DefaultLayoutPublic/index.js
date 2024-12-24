import Header from '~/layouts/componentsPublic/Header'
import Footer from '../componentsPublic/Footer';

function DefaultLayoutPublic({ children }) {
    return (
        <div >
            <Header />
            <div>
                <div className="content">{children}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayoutPublic;
