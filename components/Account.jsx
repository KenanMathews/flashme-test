import { useState, useEffect } from 'react'
import { supabase } from '../app/supabaseClient'
import Avatar from './Avatar'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return(
    <div className="md:w-full 2xl:w-4/6 flex h-full flex-col">
          {/* <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
            <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
              Account Info
            </h4>
          </div> */}
          <form onSubmit={updateProfile} className="w-full mx-auto flex flex-col justify-center "noValidate>
          <div className="flex flex-col space-y-5">
            <Avatar url={avatar_url} size={150} onUpload={(event, url) => {updateProfile(event, url)}} username={username}/>
              <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 gap-4">
                <div className="w-full md:w-1/2 ">
                  <label
                    htmlFor="username"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    Your Name (required)
                  </label>
                  <input
                    id="username"
                    name="name"
                    type="text"
                    placeholder="Enter Your Name"
                    className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    required
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 ltr:md:ml-2.5 rtl:md:mr-2.5 ltr:lg:ml-5 rtl:lg:mr-5 mt-2 md:mt-0">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    Your Email (required)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    value={session.user.email} 
                    disabled
                  />
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="website"
                  className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                >
                  Website
                </label>
                <input
                  id="website"
                  name="subject"
                  type="text"
                  placeholder="Enter Your Website"
                  className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                  autoComplete="off"
                  spellCheck="false"
                  aria-invalid="false"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="relative">
                <button
                  data-variant="flat"
                  className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                  type="submit"
                  disabled={loading}
                >
                {loading ? 'Loading ...' : 'Update'}
                </button>
                <div className="relative">
                <button
                  data-variant="flat"
                  className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                  onClick={() => supabase.auth.signOut()}
                >
                Sign out
                </button>
              </div>
            </div>
            </div>
          </form>
        </div>
  )
}

