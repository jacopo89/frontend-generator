import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useDeleteFile } from "../../../../redux/actions/verbs/deleteFile";
import { createArrayFromMap } from "../../../../utils/mapUtils";
import CustomDeleteButton from "../../../../rendering/components/buttons/CustomDeleteButton";
import ImageGrid from "../../../../rendering/components/others/ImageGrid";
import Grid from "@material-ui/core/Grid";
import ImageDialog from "../../../fields/ImageDialog";
export const ImagesGrid = ({ model, onChange, partialSubmitHandler, modelResourceName, files, resourceId, refresh }) => {
    const { id, label } = model;
    const { remove } = useDeleteFile(modelResourceName);
    const creationTime = useRef(Date.now());
    const [uploadedLocalFiles, setUploadedLocalFiles] = useState([]);
    const [totalFiles, setTotalFiles] = useState([]);
    const [localFileListMap, setLocalFileListMap] = useState(new Map());
    const [open, setOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState();
    const selectElement = (key) => {
        setSelectedImageIndex(key);
        setOpen(true);
    };
    useEffect(() => {
        if (files) {
            const arrayFiles = Array.from(files.values());
            setTotalFiles(arrayFiles);
            setLocalFileListMap(new Map(files));
        }
    }, [files]);
    useEffect(() => {
        if (files) {
            setTotalFiles([...totalFiles, ...prepareImagesForRequest(uploadedLocalFiles)]);
        }
    }, [uploadedLocalFiles]);
    const prepareImagesForRequest = (uploadedFiles) => {
        if (!uploadedFiles.length)
            return [];
        const newDataFiles = [];
        uploadedFiles.forEach((file) => {
            const newFile = {
                base64: file.data,
                title: file.file.name,
                filename: file.file.name,
            };
            newDataFiles.push(newFile);
        });
        return newDataFiles;
    };
    const deleteForm = (key) => {
        localFileListMap.delete(key);
        if (key < creationTime.current) {
            remove(resourceId, id, key);
            setLocalFileListMap(new Map(localFileListMap));
        }
        // @ts-ignore
        onChange(id, createArrayFromMap(localFileListMap));
        refresh();
    };
    const filesList = createArrayFromMap(localFileListMap).map((file, index) => {
        file.actionIcon = _jsx(CustomDeleteButton, { icon: true, onClick: () => deleteForm(file.id) }, void 0);
        return file;
    });
    const addFile = (files) => {
        setUploadedLocalFiles([...uploadedLocalFiles, ...files]);
    };
    const removeFile = (file, index) => {
        let files = [...uploadedLocalFiles];
        files.splice(index, 1);
        setUploadedLocalFiles(files);
    };
    const saveImages = () => {
        // @ts-ignore
        partialSubmitHandler({ [id]: totalFiles }).then(response => {
            // @ts-ignore
            onChange(id, response[id]);
            setUploadedLocalFiles([]);
            refresh();
        })
            .catch((e) => console.log(e));
    };
    // @ts-ignore
    const list = _jsx(ImageGrid, { images: filesList, onSelect: (index) => selectElement(index), onChange: prepareImagesForRequest, filesLimit: 10, fileObjects: uploadedLocalFiles, onAdd: addFile, onDelete: removeFile, saveImages: saveImages }, void 0);
    return _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ md: 12, xs: 12, item: true }, { children: list }), void 0), _jsx(ImageDialog, { images: filesList, open: open, selectedImageIndex: selectedImageIndex, setOpen: setOpen }, void 0)] }), void 0);
};
