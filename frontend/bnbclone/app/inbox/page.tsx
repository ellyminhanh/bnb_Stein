import Conversation from "../components/inbox/Conversation";


const InboxPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">     
            <h1 className="text-2xl mb-6 my-6 ">
                Inbox
            </h1>

            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
        </main>
    )
}

export default InboxPage;