import "./App.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/formSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Canvas } from "@react-three/fiber";
import Cube from "./components/Cube/Cube";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/ModeToggle/ModeToggle";
// import axios, { AxiosError } from "axios";
import { PerspectiveCamera } from "@react-three/drei";
import { getFakeData } from "./helpers/helpers";

function App() {
  const [error, setError] = useState("");
  const [cubeData, setCubeData] = useState<{
    vertices: number[];
    indices: number[];
  }>({ vertices: [], indices: [] });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      width: "",
      depth: "",
    },
  });

  // for server in server dir
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/cube", values);

  //     setCubeData(res.data);
  //     setError("");
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       if (error.response) {
  //         setError(error.response.data.message);
  //       }
  //       if (error.request) {
  //         setError("Error! Try again later.");
  //       }
  //     }
  //   }
  // }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const fakeData = getFakeData(values);
    setCubeData(fakeData);
    setError("");
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen grid sm:grid-cols-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-8 text-right border-2"
          >
            {error && (
              <span className="text-red-600 font-semibold text-lg">
                {error}
              </span>
            )}
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">CubeGen</h1>
              <ModeToggle />
            </div>
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Height"
                      {...field}
                      type="number"
                      min="1"
                      max="10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Width"
                      {...field}
                      type="number"
                      min="1"
                      max="10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depth</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Depth"
                      {...field}
                      type="number"
                      min="1"
                      max="10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Calculate</Button>
          </form>
        </Form>
        <div
          id="canvas-container"
          className="h-full sm:h-lvh sm:col-span-2 border-2"
        >
          <Canvas className="cursor-pointer">
            <ambientLight intensity={1} />
            <directionalLight castShadow position={[3, 7, 10]} intensity={2} />
            <directionalLight position={[0, -6, -10]} intensity={2} />
            <PerspectiveCamera makeDefault position={[5, 5, 10]} fov={75} />
            <Cube vertices={cubeData.vertices} indices={cubeData.indices} />
          </Canvas>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
