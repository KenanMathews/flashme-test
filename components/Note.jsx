import { useState, useEffect } from 'react'
import { supabase } from '../app/supabaseClient'
export default function Note({ id }) {
const [loading, setLoading] = useState(true)
const [editMode, setEditMode] = useState(null)
const [noteData, setNoteData] = useState(null)
  
    useEffect(() => {
      async function getNote() {
        setLoading(true)
        if(id == null){
            return
        }
        const { id } = id
  
        let { data, error } = await supabase
          .from('notes')
          .select(`id, label , data`)
          .eq('id', )
          .single()
  
        if (error) {
          console.warn(error)
        } else if (data) {
          setNote(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
  
        setLoading(false)
      }
  
      getNote()
    })
  return (
    <div className="rounded"></div>
    )
  }