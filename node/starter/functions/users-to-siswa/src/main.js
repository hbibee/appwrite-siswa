export default async ({ req, res, log, error }) => {
  try {
    log("=== USER ROW CREATED ===");

    log(`Event: ${req.headers["x-appwrite-event"]}`);

    log(`Request body: ${req.bodyText}`);

    return res.json({
      success: true,
      message: "User row creation event received",
    });
  } catch (err) {
    error(`Function error: ${err.message}`);

    return res.json({
      success: false,
      error: err.message,
    });
  }
};