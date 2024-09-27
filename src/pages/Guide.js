import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';

import uncheckAccountData from '../images/guide/uncheck_account_data.png';
import checkExtendedImage from '../images/guide/check_extended.png';
import requestDataButtonImage from '../images/guide/request_data_button.png';
import confirmationEmailImage from '../images/guide/confirmation_email.png';
import privacySettingsPreparingImage from '../images/guide/privacy_settings_preparing.png';
import preparingExtendedImage from '../images/guide/preparing_extended.png';
import dataReadyEmailImage from '../images/guide/data_ready_email.png';

const steps = [
    {
        content: "Hello! To render your music graph, you'll need to download your Spotify listening history and upload it to Ripplify. This will take around 5 minutes of your time.",
    },
    {
        content: "First, visit <a href='https://www.spotify.com/ca-en/account/privacy' target='_blank'>Spotify's Privacy Settings</a>. Scroll to the bottom section, 'Download your data.'",
    },
    {
        content: "Uncheck <strong>Account Data</strong>, then check <strong>Extended Streaming History</strong>. This is very important to get right, as only Exended Streaming History contains the data necessary to render your graph.",
        images: [uncheckAccountData, checkExtendedImage],
    },
    {
        content: "Click the button at the very bottom of the screen labelled 'Request Data.' (The below screenshot shows what the button looks like on the Spotify webpage; you must click it there, not on this page.)",
        images: [requestDataButtonImage],
    },
    {
        content: "Now check your email. You'll be asked to confirm your request. Click the button in the email to do so:",
        images: [confirmationEmailImage]
    },
    {
        content: "Return to the privacy settings page. The 'Download your data' section should now look like this:",
        images: [privacySettingsPreparingImage, preparingExtendedImage]
    },
    {
        content: "Now, wait for the arrival of your data dump by email. Regrettably, as indicated on the page, <strong>the Extended Streaming History data can take anywhere from 1 to 30 days for Spotify to compile,</strong> so you may have to wait a while. Unfortunately there's no way to work around this waiting period, but Ripplify will remain ready to generate your music river graph when you receive your data.",
        images: []
    },
    {
        content: "Once you receive the data by email, click the provided link to download the file.",
        images: [dataReadyEmailImage]
    },
    {
        content: "When you click Download (and log in if necessary), a file will be downloaded called <tt>my_spotify_data.zip</tt>. Upload it below:",
        images: [],
        uploader: true,
    }
];

const Guide = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <article>
            <div className='steps'>
                <div className='step'>
                    <h3>{currentStep + 1}</h3>
                    <p dangerouslySetInnerHTML={{ __html: steps[currentStep].content }} />
                    {steps[currentStep].images && (<h2>Screenshot:</h2>)}
                    {steps[currentStep].images && (steps[currentStep].images.map((img, index) => (
                        <img key={index} src={img} alt='' />
                    )))}
                </div>
                <div className='navigation'>
                    {(0 < currentStep < currentStep.length - 1) && (<button onClick={prevStep}>Previous</button>)}
                    {steps[currentStep].uploader
                        ? (<FileUploader />)
                        : <button onClick={nextStep}>Next</button>}
                </div>
            </div>
        </article>
    );
};

export default Guide;
