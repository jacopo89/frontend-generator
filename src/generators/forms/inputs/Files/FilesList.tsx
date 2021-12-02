import React, {useEffect, useRef, useState} from "react";
import {useDeleteFile} from "../../../../redux/actions/verbs/deleteFile";
import {createArrayFromMap} from "../../../../utils/mapUtils";
import CustomDeleteButton from "../../../../rendering/components/buttons/CustomDeleteButton";
import {PropertyModel} from "../../../../resource-models/PropertyModel";
import ImageGrid from "../../../../rendering/components/others/ImageGrid";
import Grid from "@material-ui/core/Grid";
import ImageDialog from "../../../fields/ImageDialog";
import FileList from "../../../../rendering/components/others/FileList";


interface FilesGridInterface {
    modelResourceName: string,
    files: Map<number, FileInterface>,
    resourceId: string,
    id: string,
    model:PropertyModel,
    refresh: ()=>{},
    partialSubmitHandler: ()=>{},
    onChange:  (vars:any)=>void
}

interface UploadedFileInterface{
    base64: string,
    filename:string,
    title:string
}

interface FileInterface{
    id: number
    filename: string,
    subDir: string,
    path: string,
    url: string
}

export const FilesList: React.FC<FilesGridInterface> = ({model,onChange,partialSubmitHandler,modelResourceName, files, resourceId,refresh}) =>{
    const {id, label}= model;
    const {remove} = useDeleteFile(modelResourceName);
    const creationTime = useRef(Date.now());
    const [uploadedLocalFiles, setUploadedLocalFiles] = useState<UploadedFileInterface[]>([]);
    const [totalFiles, setTotalFiles] = useState<any[]>([]);
    const [localFileListMap, setLocalFileListMap] = useState(new Map());
    const [open, setOpen] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

    const selectElement = (key:number) => {
        setSelectedImageIndex(key);
        setOpen(true);
    }


    useEffect(() => {
        if (files) {
            const arrayFiles = Array.from(files.values());
            setTotalFiles(arrayFiles);
            setLocalFileListMap(new Map(files));
        }
    }, [files])

    useEffect(() => {
        if(files){
            setTotalFiles([...totalFiles, ...prepareImagesForRequest(uploadedLocalFiles)])
        }
    }, [uploadedLocalFiles])

    const prepareImagesForRequest = (uploadedFiles:any[]) => {
        if (!uploadedFiles.length) return [];

        const newDataFiles: UploadedFileInterface[] = [];

        uploadedFiles.forEach((file:any) => {
            const newFile = {
                base64: file.data,
                title: file.file.name,
                filename: file.file.name,
            }
            newDataFiles.push(newFile);
        })

        return newDataFiles
    }
    const deleteForm = (key:number) => {
        localFileListMap.delete(key);
        if (key < creationTime.current) {
            remove(resourceId, id, key);
            setLocalFileListMap(new Map(localFileListMap));
        }
        // @ts-ignore
        onChange(id, createArrayFromMap(localFileListMap));
        refresh();
    }
    const filesList = createArrayFromMap(localFileListMap).map((file, index) => {
        file.actionIcon = <CustomDeleteButton icon onClick={() => deleteForm(file.id)}/>
        return file;
    })

    const addFile = (files:any[]) => {
        setUploadedLocalFiles([...uploadedLocalFiles, ...files])
    }
    const removeFile = (file:any, index:number) => {
        let files = [...uploadedLocalFiles];
        files.splice(index, 1);
        setUploadedLocalFiles(files);
    }
    const saveImages = () => {
        // @ts-ignore
        partialSubmitHandler({[id]: totalFiles}).then(response =>
        {
            // @ts-ignore
            onChange(id, response[id]);
            setUploadedLocalFiles([]);
            refresh()
        })
            .catch((e:any) => console.log(e));
    }

    // @ts-ignore
    const list = <FileList list={filesList} onChange={prepareImagesForRequest} filesLimit={10} fileObjects={uploadedLocalFiles} onAdd={addFile} onDelete={removeFile} saveImages={saveImages}/>

    return <Grid container>
        <Grid md={12} xs={12} item>
            {list}
        </Grid>
        <ImageDialog images={filesList} open={open} selectedImageIndex={selectedImageIndex} setOpen={setOpen}/>
    </Grid>
}
