import React from 'react';
import FileUploader from '../components/FileUploader';
import requestExtendedImage from '../images/guide/request_extended.png';
import requestDataButtonImage from '../images/guide/request_data_button.png';
import confirmationEmailImage from '../images/guide/confirmation_email.png';
import privacySettingsPreparingImage from '../images/guide/privacy_settings_preparing.png';
import preparingExtendedImage from '../images/guide/preparing_extended.png';
import dataReadyEmailImage from '../images/guide/data_ready_email.png';

const Guide = () => {
    return (
        <article>
            <h2>To render your music river, first upload your Spotify listening history</h2>
            <p>In order to generate your history graph, you'll need to download your Extended Streaming History from Spotify and upload it to Ripplify.</p>
            <div className='step'>
                <h3>1</h3>
                <p>To do so, visit <a href="https://www.spotify.com/ca-en/account/privacy">Spotify's Privacy Settings</a> and scroll to the bottom section, "Download your data." Request <strong>Extended Streaming History</strong> (Account data and Technical log information are not necessary).</p>
                <img src={requestExtendedImage} alt='Screenshot showing the Spotify privacy settings page with "Extended streaming history" selected' />
                <img src={requestDataButtonImage} alt='Screenshot showing the Spotify privacy settings page with "Extended streaming history" selected' />
            </div>
            <div className='step'>
                <h3>2</h3>
                <p>You'll be asked to confirm your request through an email. Do so:</p>
                <img src={confirmationEmailImage} alt="Confirmation email" />
            </div>
            <div className='step'>
                <h3>3</h3>
                <p>Return to the privacy settings page. The "Download your data" section should now look like this:</p>
                <img src={privacySettingsPreparingImage} alt='Spotify Privacy Settings page header with a notice that your data is being prepared.' />
                <img src={preparingExtendedImage} alt='Screenshot showing that your Extended Streaming History data is being prepared and may take up to 30 days to be ready' />
            </div>
            <div className='step'>
                <h3>4</h3>
                <p>Now, wait for the arrival of your data dump by email. Regrettably, as indicated on the page, <strong>the Extended Streaming History data can take anywhere from 1 to 30 days for Spotify to compile,</strong> so you may have to wait a while. Unfortunately there's no way to work around this waiting period, but Ripplify will remain ready to generate your music river graph when you receive your data.</p>
            </div>
            <div className='step'>
                <h3>5</h3>
                <p>Once you receive the data by email, click the provided link to download the file.</p>
                <img src={dataReadyEmailImage} alt="Screenshot of an email from Spotify saying the data is ready" />
            </div>
            <div className='step'>
                <h3>6</h3>
                <p>When you click Download (and log in if necessary), a file will be downloaded called <tt>my_spotify_data.zip</tt>. Upload it below:</p>
                <FileUploader />
            </div>
        </article>
    );
};

export default Guide;
