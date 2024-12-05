import React from 'react';

const Prints = ({ action }) => {
    return (
        <div className='Prints'>
            <div className='textBlock'>
                <p>We sell prints and (soon) other merchandise of our artistic representation of your listening history. To purchase, render a graph and click "Buy Prints." You can also buy a gift card that will enable your friend or family to get a beautiful print of their own music listening history—the perfect holiday gift.</p>
                {/*<a href='https://buy.stripe.com/6oEdS90Uc406bG86oo'>Buy Wall Print</a>*/}
                <a href='https://buy.stripe.com/6oEaFX46o406bG8eUV'>Buy Wall Print Gift Certificate</a>
            </div>
        </div>
    );
};

export default Prints;
