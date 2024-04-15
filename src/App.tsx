import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Main} from "./pages/Main.tsx";
import {ActionIcon, AppShell, Center, Group, Title} from "@mantine/core";
import About from "./pages/About.tsx";
import {
    IconBrandGithub,
    IconHome,
    IconInfoCircle,
} from "@tabler/icons-react";

const router = createBrowserRouter([
        {path: '/', element: <Main/>},
        {path: '/about', element: <About/>},
    ],
);

function App() {

    return (
        <AppShell header={{height: 60, offset: true}} padding={"md"}>
            <AppShell.Header>
                <Group grow px={"md"} pb={0}>
                    <Group justify={"center"}>
                        <Title>Certer</Title>
                    </Group>
                    <Group justify={"flex-end"} gap={"md"} >
                        <ActionIcon
                            variant={"outline"}
                            component={"a"}
                            href={"/"}
                        >
                            <IconHome/>
                        </ActionIcon>
                        <ActionIcon
                            variant={"outline"}
                            component={"a"}
                            href={"/about"}
                        >
                            <IconInfoCircle/>
                        </ActionIcon>
                        <ActionIcon
                            color={"black"}
                            variant={"outline"}
                            component={"a"}
                            href={"https://github.com/DanBrada/certer"}
                            target={"_blank"}
                        >
                            <IconBrandGithub/>
                        </ActionIcon>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                <Center>
                    <RouterProvider router={router}/>
                </Center>
            </AppShell.Main>
        </AppShell>
    )
}

export default App
