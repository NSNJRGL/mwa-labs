const mongoose = require("mongoose");

const participantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
});

const tournamentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organizer: String,
  teams: Number,
  participants: [participantSchema],
});

mongoose.model("Tournament", tournamentSchema, "tournaments");
