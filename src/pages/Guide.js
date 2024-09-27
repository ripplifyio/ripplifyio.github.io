import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import requestExtendedImage from '../images/guide/request_extended.png';
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
        content: "Uncheck <strong>Account Data</strong>. Check <strong>Extended Streaming History</strong>. This is very important to get right, as only Exended Streaming History contains the data necessary to render your graph.",
        images: [requestExtendedImage],
    },
    {
        content: "Click the button at the very bottom of the screen labelled 'Request Data.'",
        //images: [requestDataButtonImage],
    },
    {
        content: "Now check your email. You'll be asked to confirm your request through an email. Do so:",
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
const x = `

                <div className='step'>
                    <h2>To render your music graph, you'll need to upload your Spotify listening history. Follow this 5-minute guide to see how.</h2>
                    <p>In order to generate your history graph, you'll need to download your Extended Streaming History from Spotify.</p>
                </div>
                <div className='step'>
                    <p>To do so, visit <a href='https://www.spotify.com/ca-en/account/privacy' target='_blank'>Spotify's Privacy Settings</a> and scroll to the bottom section, "Download your data." Request <strong>Extended Streaming History</strong> (Account data and Technical log information are not necessary).</p>
                    <img src={requestExtendedImage} alt='Screenshot showing the Spotify privacy settings page with "Extended streaming history" selected' />
                    <img src={requestDataButtonImage} alt='Screenshot showing the Spotify privacy settings page with "Extended streaming history" selected' />
                </div>
                <div className='step'>
                    <p>You'll be asked to confirm your request through an email. Do so:</p>
                    <img src={confirmationEmailImage} alt="Confirmation email" />
                </div>
                <div className='step'>
                    <p>Return to the privacy settings page. The "Download your data" section should now look like this:</p>
                    <img src={privacySettingsPreparingImage} alt='Spotify Privacy Settings page header with a notice that your data is being prepared.' />
                    <img src={preparingExtendedImage} alt='Screenshot showing that your Extended Streaming History data is being prepared and may take up to 30 days to be ready' />
                </div>
                <div className='step'>
                    <p>Now, wait for the arrival of your data dump by email. Regrettably, as indicated on the page, <strong>the Extended Streaming History data can take anywhere from 1 to 30 days for Spotify to compile,</strong> so you may have to wait a while. Unfortunately there's no way to work around this waiting period, but Ripplify will remain ready to generate your music river graph when you receive your data.</p>
                </div>
                <div className='step'>
                    <p>Once you receive the data by email, click the provided link to download the file.</p>
                    <img src={dataReadyEmailImage} alt="Screenshot of an email from Spotify saying the data is ready" />
                </div>
                <div className='step'>
                    <p>When you click Download (and log in if necessary), a file will be downloaded called <tt>my_spotify_data.zip</tt>. Upload it below:</p>
                    <FileUploader />
                </div>
`

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
                    <h3>{currentStep}</h3>
                    <p dangerouslySetInnerHTML={{ __html: steps[currentStep].content }} />
                    {steps[currentStep].images && (<p>Screenshots:</p>)}
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
