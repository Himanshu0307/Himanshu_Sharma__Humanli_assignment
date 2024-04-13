
import UserLayout from "../layouts/UserLayout";
import getRommIdFromEmail from "../../utils/getRoomId";
import { useEffect } from "react";



export default function AllUsers({
  users,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  useEffect(() => { }, [onlineUsersId])
  users = users.filter(x => x.email !== currentUser.email);
  const handleNewChatRoom = async (user) => {
    changeChat(user);
  };

  return (
    <>
      <ul className="overflow-auto h-[30rem]">
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Chats</h2>

        <li>
          {users.map((x, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNewChatRoom(x)}
            >
              <UserLayout user={x} onlineUsersId={onlineUsersId} />
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}
