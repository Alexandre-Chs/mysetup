"use client";

import { uploadFile } from "@/actions/media/upload";
import { createSetup } from "@/actions/setup/create";
import { listUserSetup } from "@/actions/setup/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
 
const SetupList = () => {
    const res = useQuery({ queryKey: ['setup'], queryFn: () => listUserSetup()})

    if (res.isPending) return <div>Loading...</div>
    if (res.isError) return <div>Error: {res.error.message}</div>

    return (
        <>
            {res?.data?.map((setup) => (
                <div key={setup.id}>{setup.name}</div>
            ))}
        </>
    )
}

const SetupCreate = () => {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: async () => { return await createSetup('setup name', 'setup description') },
        onSuccess: () => { queryClient.invalidateQueries({queryKey: ['setup']}) },
    })

    return (
        <button onClick={() => mutate()}>Créer un setup</button>
    )

}

const Profile = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.target as HTMLFormElement);
        await uploadFile(formData);
    }

    return (
        <div>
            {/* <h1>Bonjour</h1>
            <SetupCreate />
            <SetupList /> */}
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" id="" />
                <button>Envoyer</button>
            </form>
        </div>
    )
}

export default Profile;