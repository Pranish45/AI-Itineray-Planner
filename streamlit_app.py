import os
import re
from typing import List

import streamlit as st
from google.generativeai import configure, GenerativeModel

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
# The Gemini / Google Generative AI key should be provided as an environment
# variable so that secrets are not hard-coded in source control.
GEMINI_API_KEY = os.getenv("AIzaSyCjvR39xym6c9bEdo_qaPkwI0LUC7qw-Mo")
if not GEMINI_API_KEY:
    st.warning(
        "⚠️  GEMINI_API_KEY environment variable not set. "
        "Set it before running the app to generate itineraries.",
        icon="🚨",
    )
else:
    configure(api_key=GEMINI_API_KEY)

gemini_model = GenerativeModel("gemini-2.0-flash")

# ---------------------------------------------------------------------------
# Core business logic (re-using the prompt from project.py)
# ---------------------------------------------------------------------------

def generate_itinerary(city: str, interests: List[str], days: int) -> str:
    """Ask Gemini to create a travel itinerary."""
    interest_str = ", ".join(interests)

    prompt = f"""
    Create a unique {days}-day travel itinerary for {city} based on the following interests: {interest_str}.
    Each day's plan should include:
    - Morning: Activities like sightseeing, nature walks, or cultural visits.
    - Afternoon: Adventure activities, historical tours, or food experiences.
    - Evening: Entertainment, nightlife, or relaxation options.

    Ensure each day has different activities and travel tips.
    Format the response in a structured way.
    """

    try:
        response = gemini_model.generate_content(prompt)
        return response.text if response else "⚠️ Could not generate itinerary. Please try again."
    except Exception as e:
        return f"⚠️ Error generating itinerary: {str(e)}"


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def parse_days(itinerary: str):
    """Split itinerary into a mapping Day → details using simple regex heuristics."""
    pattern = re.compile(r"📅?\s*Day\s*(\d+)[\s:.-]*", re.IGNORECASE)
    lines = itinerary.splitlines()
    days = {}
    current_day = None
    for line in lines:
        match = pattern.search(line)
        if match:
            current_day = f"Day {match.group(1)}"
            days[current_day] = []
            # keep the original formatted line as header inside expander
            days[current_day].append(line)
        elif current_day is not None:
            days[current_day].append(line)
    return days


# ---------------------------------------------------------------------------
# Streamlit UI definition
# ---------------------------------------------------------------------------

st.set_page_config(
    page_title="AI Itinerary Planner",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.title("🌍 AI Travel Planner")

with st.sidebar:
    st.header("✈️ Trip parameters")

    # 1. Destination City
    city = st.text_input("Destination city", placeholder="e.g. Tokyo")

    # 2. Travel Days
    days = st.number_input("Trip length (days)", min_value=1, max_value=30, value=3, step=1)

    # 3. Interests
    default_interests = [
        "Culture",
        "Food",
        "Nightlife",
        "Nature",
        "Adventure",
        "History",
        "Shopping",
        "Relaxation",
    ]
    interests = st.multiselect("Select interests", options=default_interests, default=["Culture", "Food"])

    custom_tags_raw = st.text_input("Custom interests (comma separated)")

    generate = st.button("✨ Generate AI Itinerary ✨", type="primary")

if generate:
    if not city:
        st.error("Please enter a destination city to continue.")
        st.stop()

    # Merge selected and custom interests
    customs = [tag.strip() for tag in custom_tags_raw.split(",") if tag.strip()]
    interests_combined = interests + customs

    with st.spinner("Talking to Gemini …"):
        itinerary_text = generate_itinerary(city, interests_combined, int(days))

    if itinerary_text.startswith("⚠️"):
        st.error(itinerary_text)
        st.stop()

    # Display the full raw itinerary in one expander for transparency
    with st.expander("📄 Raw itinerary text (toggle)"):
        st.markdown(itinerary_text)

    day_sections = parse_days(itinerary_text)

    st.subheader(f"🗺️ {days}-Day Travel Plan for {city}")

    for idx, (day, contents) in enumerate(day_sections.items(), start=1):
        with st.expander(f"📅 {day}", expanded=idx == 1):
            for line in contents:
                # Apply simple markdown replacements for headings
                if any(h in line for h in ["🌅 Morning:", "🌞 Afternoon:", "🌙 Evening:"]):
                    st.markdown(f"**{line.strip()}**")
                else:
                    st.markdown(line)

    st.success("🚀 Your AI-powered itinerary is ready! Plan less, travel more.")
