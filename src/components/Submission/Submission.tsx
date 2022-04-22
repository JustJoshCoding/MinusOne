import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { array, object, string } from 'yup';
import { MultipleFileUploadField } from '../SubmissionBox/upload/MultipleFileUploadField';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{ files: [] }}
          validationSchema={object({
            files: array(
              object({
                url: string().required(),
              })
            ),
          })}
          onSubmit={() => {
            return new Promise((res) => setTimeout(res, 2000));
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <MultipleFileUploadField name="files" />

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid || isSubmitting}
                    type="submit"
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>

            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
