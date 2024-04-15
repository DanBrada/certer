import {Alert, Stack, Stepper, Title} from "@mantine/core";
import {useState} from "react";
import {PrivateGen} from "../components/privkey.tsx";
import {IconLock} from "@tabler/icons-react";

export function Main() {
	const [active, setActive] = useState(0);

	return (
		<>
			<Stepper active={active}>
				<Stepper.Step step={0} label={"Private key"} description={"For certificate"}>
					<Stack gap={"md"}>
						<Title lh={"h2"}>Upload or create a private key</Title>
						<Alert icon={<IconLock/>} title={"Your data is secure."} color={"gray"}>
							We only store this information in your browser until you close this tab. We won't send this
							to anyone.
						</Alert>
						<PrivateGen/>
					</Stack>
				</Stepper.Step>
				<Stepper.Step step={1} label={"Create CSR"} description={"With required info"}>
					Take emails and other info to create CSR
					By the end download CSR
				</Stepper.Step>
				<Stepper.Step step={2} label={"Convert apple certificate"} description={"And download"}>
					Fuck them 🍎s
				</Stepper.Step>
			</Stepper>
		</>
	)
}