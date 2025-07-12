import {admin} from "../config/firebase-admin.js";

export default async function verifyTokens(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      name: decoded.name,
      email: decoded.email,
    };
    next();
  } catch (err) {
    console.error(' Token verification failed:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
}
