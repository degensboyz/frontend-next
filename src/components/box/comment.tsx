import { useState } from "react";
import Image from "next/image";
export default function BoxComment() {
    let [files, setFiles] = useState<File[]>([]);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileArray = Array.from(selectedFiles);
            setFiles(fileArray);
        }
    }
    const removeFile = (file: File) => {
        setFiles(files.filter((f) => f !== file));
    }
    return (
        <div>
            <div className="border-2 border-white rounded-lg p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        {files.map((file) => (
                            <div key={file.name}>
                                <div className="w-20 h-20 object-cover relative">
                                    <button className="bg-white text-black px-2 py-1 rounded-lg absolute top-0 right-0 z-10 text-sm" onClick={() => removeFile(file)}>X</button>
                                    <Image src={URL.createObjectURL(file)} alt="File" layout="fill" objectFit="cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex flex-row gap-4 justify-end">
                        <input type="file" id="file-input" className="hidden" accept="image/png, image/gif, image/jpeg" multiple={true} onChange={handleFileChange} />
                        <button className="bg-white text-black px-4 py-2 rounded-lg" onClick={() => document.getElementById("file-input")?.click()}>Choose File</button>
                    </div>
                    <textarea className="w-full h-24 border-2 border-white rounded-lg p-2 text-black" placeholder="Comment"></textarea>
                    <button className="bg-white text-black px-4 py-2 rounded-lg">Comment</button>
                </div>
            </div>
        </div>
    )
}
