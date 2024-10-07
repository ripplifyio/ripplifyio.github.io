import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
        nextTitle: 'Start',
    },
    {
        content: "First, visit <a href='https://www.spotify.com/ca-en/account/privacy' target='_blank'>Spotify's Privacy Settings</a>. Scroll to the bottom section, 'Download your data.' But <strong>DON'T download your data yet!</strong>",
        nextTitle: 'I found the section',
    },
    {
        content: "Uncheck <strong>Account Data</strong>, then check <strong>Extended Streaming History</strong>. This is very important to get right, as only Exended Streaming History contains the data necessary to render your graph.",
        images: [uncheckAccountData, checkExtendedImage],
        nextTitle: 'I made sure only Extended Streaming History is checked',
    },
    {
        content: "Click the button at the very bottom of the screen labelled 'Request Data.' (The below screenshot shows what the button looks like on the Spotify webpage; you must click it there, not on this page.)",
        images: [requestDataButtonImage],
        nextTitle: 'I clicked Request Data on the Spotify page',
    },
    {
        content: "Now check your email. You'll be asked to confirm your request. Click the button in the email to do so:",
        images: [confirmationEmailImage],
        nextTitle: 'I found the email and clicked Confirm'
    },
    {
        content: "You'll be brought back to the settings page. You should see a new banner at the top of the page, and the Extended Streaming History section should state that your data is being prepared.",
        images: [privacySettingsPreparingImage, preparingExtendedImage]
    },
    {
        content: "Wait to receive your data by email. Spotify unfortunately takes 2-4 weeks to prepare your Extended Streaming History. We will send you an email in 4 weeks to remind you to download the data and provide further instructions. Note that you should follow the download link in the email ASAP, as the file will expire two weeks after you receive the email.",
        nextTitle: 'I have my data now',
    },
    {
        content: 'Once you receive the data by email, click the provided link to download the file.',
        images: [dataReadyEmailImage],
        nextTitle: 'I downloaded my data file'
    },
    {
        content: "When you click Download (and log in if necessary), a file will be downloaded called <tt>my_spotify_data.zip</tt>. Click below to upload it for rendering:",
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

    const skip = () => {
        setCurrentStep(8);
    };

    return (
        <article>
            <div className='steps'>
                {(0 < currentStep && currentStep < steps.length) && (<button onClick={prevStep}><FontAwesomeIcon icon={faChevronLeft} /> Back</button>)}
                {currentStep === 0 && <button onClick={skip}>Skip to upload</button>}
                <div className='step'>
                    <h3>{currentStep + 1}</h3>
                    <p dangerouslySetInnerHTML={{ __html: steps[currentStep].content }} />
                    {steps[currentStep].images && (<h2>Screenshot:</h2>)}
                    {steps[currentStep].images && (steps[currentStep].images.map((img, index) => (
                        <img key={index} src={img} alt='' />
                    )))}
                </div>
                <div className='navigation'>
                    {steps[currentStep].uploader
                        ? (<FileUploader />)
                        : <button onClick={nextStep}>{steps[currentStep].nextTitle || 'Next'} <FontAwesomeIcon icon={faChevronRight} /></button>}
                </div>
            </div>
        </article>
    );
};

export default Guide;
