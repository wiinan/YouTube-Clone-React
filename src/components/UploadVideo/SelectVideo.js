import { Dialog, Slide, DialogTitle, Divider, DialogContent } from '@material-ui/core';
import { Close, Publish } from '@material-ui/icons';
import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import './style.css';
import UploadVideo from './UploadVideo';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

export default function SelectVideo() {
    const { showUploadVideo, setShowUploadVideo } = useAppContext()
    const [video, setVideo] = useState(null)
    const handleVideoChange = (e) => {
        if (e.target.files[0]) {
            setVideo(e.target.files[0])
        }
    }
    return (
        <div>
            <Dialog TransitionComponent={Transition} open={showUploadVideo} keepMounted >
                {video ? (<UploadVideo video={video} setvideo={setVideo} handleClose={() => { setShowUploadVideo(false) }} />
                ) : (
                    <>
                        <div className='SelectVideo__header'>
                            <DialogTitle>Upload Videos</DialogTitle>
                            <Close className='selectvideo__closeIcon' onClick={() => setShowUploadVideo(!showUploadVideo)}>X</Close>
                        </div>
                        <Divider />
                        <DialogContent className='selectvideo__dialog'>
                            <div className='selectvideo__publishWrap'>
                                <Publish className='selectvideo__publishIcon' />
                            </div>
                            <div className='selectvideo__texts'>
                                <p className='sv__texts__title'>Arraste e Solte o video para Upload</p>
                                <p className='sv__texts__subtitle'>Seus videos serão privados até a publicação</p>
                            </div>
                            <input onChange={handleVideoChange} className='custom-file-input' type='file' />
                            <p className='sv__texts__prpo'>
                                Ao Fazer o upload no Youtube voce aceita os termos de contrato e serviços.
                            </p>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    )
}