import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {InferGetServerSidePropsType} from "next/types";
import type {GetServerSidePropsContext, NextPage} from "next/types";
import Typography from "@mui/material/Typography";
import {api} from "~/utils/api";
import Button from "@mui/material/Button";
import {useZodForm} from "~/utils/useZodForm";
import Alert from "@mui/material/Alert";
import {SubmitHandler} from "react-hook-form";
import TextField from "@mui/material/TextField";
import TextAreaautosize from "@mui/material/TextareaAutosize";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
import {z, TypeOf} from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

type CreatePostSchema = TypeOf<typeof createPostSchema>

const Page: NextPage<Props> = ({id}) => {
  const {data, refetch} = api.post.all.useQuery();

  const createMutation = api.post.create.useMutation();
  const {error} = createMutation;


  const formContext = useZodForm({
    schema: createPostSchema
  })

  const handleSubmit: SubmitHandler<CreatePostSchema> = async (props) => {
    await createMutation.mutateAsync({
      title: parseInt(props.title) as string,
      content: props.content
    });
  }


  const theme = useTheme();
  return (
    <div>
      <h1>Next.js</h1>
      <p>Current theme: {theme.palette.mode}</p>
      <p>Current id: {id}</p>
      <Typography>{JSON.stringify(data ?? [])}</Typography>
      <Box sx={{
        width: 100,
        height: 100,
      }}/>
      <Alert severity="error">{JSON.stringify(error)}</Alert>
      <Alert severity="error">{JSON.stringify(formContext.formState.errors)}</Alert>
      <form onSubmit={formContext.handleSubmit(handleSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextField
            type={"number"}
            label={"Title"}
            {...formContext.register("title")}
          />
          <TextAreaautosize  {...formContext.register("content")} />
          <Button type={"submit"}>Create Post</Button>
        </Box>

      </form>

      <Button onClick={() => refetch()} variant={"contained"}>Refetch</Button>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query?.id;
  console.log("query: ", ctx.query.id)
  return {
    props: {
      id: id ?? null,
    }
  }
}


export default Page;