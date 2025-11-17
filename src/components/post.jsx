import { Button } from "@mui/material";

export function Post(){

    const posts =[1,2,3,4,5]

    return <>
     <div>
        <p className="my-4">Create Post</p>
        <form className="flex justify-between items-center ">
            <textarea className="border rounded-lg"/>
            <input type="file"/>
            <input type="text" placeholder="title" className="border rounded-lg px-4 py-1"/>
            <Button>Post</Button>
        </form>
         <p className="my-4">Edit Post</p>
        <form>
          {posts.map((post,index)=><div key={index} className="flex flex-row items-center">
            <p>{post}</p>
            <Button>Edit</Button>
            <Button>Delete</Button>

          </div>)}
        </form>
     </div>
    </>
}