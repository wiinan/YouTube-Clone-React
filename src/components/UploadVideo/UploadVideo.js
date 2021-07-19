import { Button, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../context/appContext';
import { db, storage } from '../../lib/firebase';
import firebase from 'firebase';

export default function UploadVideo({ video, handleClose }) {
    const [progress, setProgress] = useState(0);
    const [thumbnailProgress, setThumbnailProgress] = useState(0);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailURL, setThumbnailURL] = useState(null)
    const [videoURL, setVideoURL] = useState(null)
    const [id, setId] = useState(uuidv4());
    const [thumbnailUploaded, setThumbnailUploaded] = useState(false)
    const [videoUploaded, setVideoUploaded] = useState(false)

    const { currentUser } = useAppContext()

    const createID = () => setId(uuidv4())

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setThumbnail(e.target.files[0])
        }
    }

    const handleVideoUploaded = () => {
        const uploadVideo = storage.ref(`videos/${video.name}`).put(video)
        uploadVideo.on(
            'state_changed',
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progressPercent)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('videos').child(video.name).getDownloadURL().then((url) => {
                    setVideoURL(url)
                    setVideoUploaded(true)
                }).catch((err) => console.log(err))
            }
        )
    }
    const handleThumbnailUpload = () => {
        const uploadThumbnail = storage.ref(`thumbnails/${thumbnail.name}`).put(thumbnail)
        uploadThumbnail.on(
            'state_changed',
            (snapshot) => {
                const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setThumbnailProgress(progressPercent)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('thumbnails').child(thumbnail.name).getDownloadURL().then((url) => {
                    setThumbnailURL(url);
                    setThumbnailUploaded(true)
                })
            }
        )
    }
    const handleSubmit = () => {
        createID()
        handleVideoUploaded()
        handleThumbnailUpload()
    }

    useEffect(() => {
        if (thumbnailUploaded && videoUploaded) {
            db.collection('Videos').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                id: id,
                videoURL: videoURL,
                thumbnailURL: thumbnailURL,
                title: title,
                description: description,
                channelName: currentUser.displayName,
                email: currentUser.email
            }).then(() => {
                setProgress(0)
                video = null
                setTitle('')
                setThumbnail('')
                setThumbnailURL('')
                setVideoURL('')
                setDescription('')
                handleClose()
            })
        }
    }, [thumbnailUploaded, videoUploaded])
    return (
        <div>
            <div className='SelectVideo__header'>
                <DialogTitle>Upload videos</DialogTitle>
                <Close className='selectvideo__closeIcon' />
            </div>
            <Divider />
            <DialogContent>
                <DialogTitle>Detalhes</DialogTitle>
                <TextField label='Titulo' variant='outlined' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField label='Descricao' multiline rows={10} variant='outlined' fullWidth placeHolder='Descreva tudo sobre seu video' style={{ marginTop: '30px' }} value={description} onChange={(e) => setDescription(e.target.value)} />
                <input className='custom-file-input add-thumbnail' type='file' placeholder='Thumbnail' onChange={handleChange} />
                <progress value={progress} max='100' />
                <DialogActions >
                    <Button variant='contained' onClick={handleSubmit} color='primary'>
                        Enviar
                    </Button>
                </DialogActions>
            </DialogContent>
        </div>
    )
}