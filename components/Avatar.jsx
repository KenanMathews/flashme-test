import { useEffect, useState } from 'react'
import { supabase } from '../app/supabaseClient'

export default function Avatar({ url, size, onUpload, username}) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }
  function getFirstLetter(word){
        if(word){
        return word[0];
        }
        return "A";
    }

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
    <div className="mb-4">
    {avatarUrl ? (
        <img className="w-auto mx-auto rounded-md object-cover object-center" src={avatarUrl} alt="Avatar" />
      ) : (
        <div className="mx-auto m-1 w-12 h-12 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">{getFirstLetter(username)}</div>
      )}
    </div>
    <label className="cursor-pointer mt-6">
    <span className="mt-2 text-base leading-normal px-4 py-2 bg-blue-500 text-white rounded-full" >Select Avatar</span>
    <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
    </label>
    </div>
  )
}