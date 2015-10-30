# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

wishes = [
  "Set Foot on North America, South America, Asia, Europe, Australia, Antarctica and Africa",
  "Ride in a Hot Air Balloon",
  "Personally Know Someone Famous",
  "Dance with Miss America",
  "Swim with a Dolphin",
  "Learn a Foreign Language and Actually Use It",
  "Have my Portrait Painted",
  "Watch a Space Shuttle Launch",
  "Be an Extra in a Film",
  "Skydive",
  "Scuba Dive",
  "Ride a Train",
  "Be a Member of a Studio Audience",
  "Send a Message in a Bottle and get a Response",
  "Go to Space",
  "Plant a Tree and Watch it Grow",
  "Learn to Ballroom Dance -Properly",
  "Sit on a Jury",
  "Write an Autobiography",
  "Be Someone’s Mentor",
  "Shower in a Waterfall",
  "Learn to Legitimately Play a Song on any Musical Instrument",
  "Teach someone illiterate to read",
  "Spend the night in a haunted place",
  "See a Lunar Eclipse",
  "Spend New Year’s Eve in Times Square",
  "Drive Across America Coast-to-Coast",
  "Go Snow Skiing",
  "Crash an extravagant wedding",
  "Write my will",
  "Sleep under the stars",
  "Go white-water rafting"
]
colors = ["#fc4949", "#5684f7", "#58f4cd", "#f28557", "#fc7e7e", "#bf68f9"];
wishes.each do |wish|
  @wish = Wish.create(text: wish)
  @wish.color = colors.sample
  @wish.save
end