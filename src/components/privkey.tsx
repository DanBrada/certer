import {Button, Checkbox, Divider, Group, NumberInput, SegmentedControl, Stack, Text, Title} from "@mantine/core";
import '@mantine/dropzone/styles.css';
import {Dropzone} from "@mantine/dropzone";
import {IconBan, IconDeviceFloppy, IconFileCertificate} from "@tabler/icons-react";
import {FormEvent, useState} from "react";
import {useForm} from "@mantine/form";

interface PrivateGenProps {
	onDoneCallback?: () => void;
}

interface KeyGenVals {
	keyLen: number | '2048'
	download: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PrivateGen({onDoneCallback}: PrivateGenProps) {
	const [doing, setDoing] = useState<boolean>(false)
	const createKeyForm = useForm<KeyGenVals>({
		mode: 'controlled',
		initialValues: {
			keyLen: '2048',
			download: true
		},
		validate: {
			keyLen: (value) => {
				const parseVal = typeof value == "number" ? value : parseInt(value)
				return !isNaN(parseVal) && parseVal >= 2048 && parseVal % 1024 == 0
			}
		}
	})

	const handleForm = (e: FormEvent) => {
		e.preventDefault()
		setDoing(true)
		createKeyForm.validate()
		setTimeout(() => {
			setDoing(false)
			if (onDoneCallback) {
				onDoneCallback()
			}
		}, 2000)
	}

	return (
		<>
			<Title lh={"h3"}>Upload Private key</Title>
			<Dropzone onDrop={(f) => {
				console.log(f)
			}} maxSize={100 * 1024} loading={doing} maxFiles={1}>
				<Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
					<Dropzone.Reject>
						<IconBan stroke={1.5}></IconBan>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconFileCertificate stroke={1.5}/>
					</Dropzone.Idle>

					<div>
						<Text size="xl" inline>
							Upload Private key here
						</Text>
						<Text size="sm" c="dimmed" inline mt={7}>
							Click or drop here (max 100KB)
						</Text>
					</div>
				</Group>
			</Dropzone>
			<Divider label={"or"}></Divider>
			<Stack gap={"md"}>
				<Title lh={"h3"}>Create a Private key</Title>
				<form method={"GET"} onSubmit={handleForm}>
					<Stack gap={"md"}>
						<label>
							Key Length <br/>
							<SegmentedControl
								fullWidth
								data={['2048', '3072', '4096', '5120']}
								{...createKeyForm.getInputProps('keyLen', {defaultValue: '2048'})}
							/>
						</label>
						<Checkbox
							label={"Download key"}
							{...createKeyForm.getInputProps('download', {type: 'checkbox'})}/>

						<Button type={"submit"} leftSection={<IconDeviceFloppy/>} loading={doing}>
							Create {createKeyForm.getValues().download && "and download "}private key
						</Button>
					</Stack>
				</form>
			</Stack>
		</>
	)
}