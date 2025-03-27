const env = {
    local: "http://localhost:3000",
    dev: "https://fortunedgalab.xyz/dev",
    prod: "https://fortunedgalab.xyz"
}

const BACK_URL = env[window.location.hostname.includes("personamakerdev") 
    ? "dev" 
    : window.location.hostname.includes("personamaker") 
    ? "prod" 
    : "local"
]
console.log(window.location.hostname)
console.log(BACK_URL)

const HOME = "Home"
const QUIZ = "Quiz"
const LOGOUT = "Logout"
const SUBMIT = "Submit"

// questions
const QUESTIONS = "Questions"
const STATUS = "Status"

// register
const REGISTRATION = "Registration"
const DANGER_ALERT = "This is a danger alert—check it out!"
const EMAIL_NEVER_SHARED = "We'll never share your email with anyone else."
const HAVE_AN_ACCOUNT = "Have an account? Sign in"
const ACC_CREATED = "Account created - redirecting to login..."

// login
const LOGIN = "Login"
const EMAIL_LABEL = "Email address"
const PASSWORD_LABEL = "Password"
const SIGNUP_LABEL = "Sign Up"

// admin
const ADMIN = "Admin"
const EMAIL = "Email"
const ROLE = "Role"
const API_TOKENS = "Number of successful requests made"
const BAN_UNBAN = "Ban/Unban"
const BAN = "Ban"
const UNBAN = "Unban"
const USERS_HEADING = "Users"
const RECORDS_HEADING = "Endpoint Usage"
const METHOD_HEADING = "Method"
const ROUTE_HEADING = "Endpoint"
const COUNT_HEADING = "Count"


// index
const TITLE_INDEX = "Persona Maker"
const DESCRIPTION_INDEX = "Discover your persona!"
const START_ADV = "Start Adventure"
const TOKENS_REMAINING = "API Calls Remaining: "

// 403
const TITLE_403 = "403 Not Authorised"
const DESCRIPTION_403 = "You are not authorised to view this page."

// errors
const ERR_NETWORK = "Network error."
const ERROR = "Error"
const NO_IMG_URL = "No image URL returned"