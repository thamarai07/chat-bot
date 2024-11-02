import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const FileUpload = ({ children, setFiles, multiple, fileType }) => {
	const onDrop = useCallback(
		(acceptedFiles) => {
			acceptedFiles.forEach((file) => {
				const reader = new FileReader();

				reader.onabort = () => console.log("file reading was aborted");
				reader.onerror = () => console.log("file reading has failed");
				reader.onload = () => {
					// Do whatever you want with the file contents
					const binaryStr = reader.result;
					console.log(binaryStr);
				};
				reader.readAsArrayBuffer(file);
			});
			const browsedFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			);
			console.log({ browsedFiles }, browsedFiles[0]);
			setFiles(browsedFiles[0]);
		},
		[setFiles]
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: fileType,
		multiple: multiple,
	});

	return (
		<>
			<div
				{...getRootProps({
					className: "dropzone",
					style: { display: "block" },
					role: "button",
				})}
			>
				<input {...getInputProps()} id="uploadResume" />
				{children}
			</div>
		</>
	);
};

export default FileUpload;
