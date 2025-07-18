import { useEffect, useState } from "react";
import { fetchPipelineRuns } from "../services/pipelineService";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";

const statusColorMap = {
  success: "success",
  failed: "error",
  running: "warning",
  pending: "info",
};

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    fetchPipelineRuns()
      .then(setRuns)
      .catch((e) => console.error("Failed to fetch runs:", e));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Pipeline Runs
      </Typography>

      <Grid container spacing={2}>
        {runs.map((run) => (
           <Grid item xs={12} sm={6} md={4} lg={3} key={run.id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                  borderColor: "primary.main",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {run.branch}
                  </Typography>
                  <Chip
                    size="small"
                    label={run.status}
                    color={statusColorMap[run.status] || "default"}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" noWrap>
                  Commit: {run.commitSha}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Started: {new Date(run.startedAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {run.durationSeconds} seconds
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}