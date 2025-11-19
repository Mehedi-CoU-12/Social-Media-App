import api from '@/lib/axiosInstance'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

export default function usePostCreate() {
    const [text, setText] = useState('')
    const [files, setFiles] = useState<File[]>([])
    const [fileType, setFileType] = useState<
        'photo' | 'video' | 'event' | 'article' | null
    >(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handlePost = useCallback(async () => {
        if (submitting) return
        try {
            setSubmitting(true)
            const formData = new FormData()
            formData.append('text', text)

            files.forEach((file, index) => {
                formData.append('files', file)
            })

            const res = await api.post('/api/posts/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('-------response from server----', res.data)
            toast.success('Post created successfully')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        } finally {
            setSubmitting(false)
            setText('')
            setFiles([])
        }
    }, [text, files, submitting])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : []

        setFiles((prev) => [...prev, ...selectedFiles])
    }

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    return {
        text,
        setText,
        files,
        setFiles,
        fileType,
        setFileType,
        modalOpen,
        setModalOpen,
        submitting,
        handlePost,
        handleFileChange,
        removeFile,
    }
}
