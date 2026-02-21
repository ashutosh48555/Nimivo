# Nimivo: Complete Workflow Diagrams

> **Visual Reference for All System Flows**  
> Last Updated: 17 February 2026  
> Purpose: Visualize every critical process in Nimivo platform

---

## Table of Contents

1. [Customer Journey Workflows](#customer-journey-workflows)
2. [Provider Journey Workflows](#provider-journey-workflows)
3. [System Architecture Diagrams](#system-architecture-diagrams)
4. [Payment & Financial Flows](#payment--financial-flows)
5. [Trust & Safety Workflows](#trust--safety-workflows)
6. [Real-Time Communication Flows](#real-time-communication-flows)

---

## Customer Journey Workflows

### 1. Complete Customer Booking Journey

```mermaid
flowchart TD
    Start([Customer opens app]) --> Browse[Browse services OR search]
    Browse --> SelectCat[Select category: 'AC Repair']
    SelectCat --> Symptom[Answer symptom questionnaire]
    Symptom --> PreDiag[Pre-diagnosis result shown]
    PreDiag --> EstCost[Estimated cost: ₹450-850]
    EstCost --> PostJob[Post job request]
    PostJob --> WaitBids[Wait for provider bids]
    WaitBids --> BidArrive{Bids arrive in real-time}
    BidArrive --> ViewBids[View bid cards with provider details]
    ViewBids --> CompareBids[Compare: price, rating, ETA, portfolio]
    CompareBids --> SelectBid[Select best bid]
    SelectBid --> Payment[Authorize payment via Razorpay]
    Payment --> Confirmed[Booking confirmed]
    Confirmed --> Track[Track provider in real-time]
    Track --> Arrived[Provider arrives]
    Arrived --> DiagCheck{Diagnosis different?}
    DiagCheck -->|Yes| PhotoReview[Review photo diagnosis]
    DiagCheck -->|No| Service[Service proceeds]
    PhotoReview --> ApproveWork{Approve work?}
    ApproveWork -->|Yes| Service
    ApproveWork -->|No| Cancel[Cancel booking, refund]
    Service --> Complete[Service completed]
    Complete --> Confirm[Confirm completion]
    Confirm --> Wait24[24-hour dispute window]
    Wait24 --> NoIssue{Any issues?}
    NoIssue -->|No| PayRelease[Payment released to provider]
    NoIssue -->|Yes| Dispute[File dispute]
    Dispute --> Resolution[Admin review]
    PayRelease --> Rate[Rate provider]
    Rate --> End([Journey complete])
```

### 2. First-Time Customer Onboarding

```mermaid
stateDiagram-v2
    [*] --> LandingPage: Downloads app
    LandingPage --> SignUp: Taps 'Get Started'
    SignUp --> OTP: Enters phone number
    OTP --> Verified: Enters OTP code
    Verified --> Location: Request location access
    Location --> Permissions: Grant permissions
    Permissions --> Welcome: Welcome screen
    Welcome --> BrowseServices: Browse services
    BrowseServices --> FirstBooking: Select a service
    FirstBooking --> [*]: Completes first job
```

### 3. Repeat Customer Flow

```mermaid
flowchart LR
    A[Customer opens app] --> B{Has favorite provider?}
    B -->|Yes| C[Tap 'My Pro']
    B -->|No| D[Browse all providers]
    C --> E[See saved provider profile]
    E --> F[Rebook directly]
    F --> G[Auto-fill details from last booking]
    G --> H[Confirm & pay]
    H --> I[Provider notified]
    D --> J[Post job request]
    J --> K[Receive bids]
    K --> L[Pick provider]
    L --> H
```

---

## Provider Journey Workflows

### 1. Complete Provider Onboarding

```mermaid
flowchart TD
    Start([Provider hears about Nimivo]) --> Download[Downloads app]
    Download --> SignUp[Sign up with phone number]
    SignUp --> OTP[OTP verification]
    OTP --> Identity[Upload Aadhaar for verification]
    Identity --> Category[Select service categories]
    Category --> Skills[Declare granular skills]
    
    Skills --> Example1["Example: 'AC Gas Refill'"]
    Example1 --> Example2["Example: 'AC Capacitor Replacement'"]
    Example2 --> Example3["NOT just 'Electrical'"]
    
    Example3 --> Experience[Add years of experience per skill]
    Experience --> Photo[Upload profile photo]
    Photo --> Bio[Write short bio]
    Bio --> Location[Set service area location]
    Location --> Tier{Choose subscription tier}
    
    Tier -->|Free| Free["₹49 per bid<br/>Basic features"]
    Tier -->|Pro| Pro["₹599/month<br/>₹0 per bid<br/>Full tools"]
    
    Free --> Approved[Account approved]
    Pro --> Approved
    
    Approved --> Dashboard[Access provider dashboard]
    Dashboard --> SeeJobs[See nearby open requests]
    SeeJobs --> FirstBid[Submit first bid]
    FirstBid --> Win[Win first job]
    Win --> Complete[Complete service]
    Complete --> Upload[Upload before/after photos]
    Upload --> Portfolio[Photos added to portfolio]
    Portfolio --> Review[Customer leaves review]
    Review --> Build[Building reputation...]
    Build --> More[Get more jobs]
```

### 2. Provider Daily Workflow

```mermaid
sequenceDiagram
    participant P as Provider
    participant App as Nimivo App
    participant Socket as Real-Time Server
    participant C as Customer

    Note over P: Morning
    P->>App: Opens app, sets status to 'Available'
    App->>Socket: Provider online
    
    Note over C: Customer posts job
    C->>App: Posts 'Plumbing repair needed'
    App->>Socket: Broadcast to nearby plumbers
    Socket->>P: Push notification: New job near you
    
    P->>App: Views job details
    P->>App: Submits bid: ₹400, 15 min ETA
    App->>Socket: Notify customer of new bid
    Socket->>C: Real-time: New bid received
    
    C->>App: Accepts Provider's bid
    App->>Socket: Notify provider
    Socket->>P: Job won! Customer address shown
    
    P->>App: Navigates to location (Google Maps)
    P->>App: Marks 'On the way'
    P->>App: Arrives, marks 'Started'
    P->>App: Completes work, marks 'Complete'
    P->>App: Uploads after photos
    
    C->>App: Confirms work done
    App->>P: Payment will be released in 24 hours
    
    Note over P: Next Day
    App->>P: ₹370 deposited to your bank
    P->>App: Views earnings dashboard
```

### 3. Provider Portfolio Building

```mermaid
flowchart LR
    A[Complete job] --> B[Upload before photo]
    B --> C[Upload after photo]
    C --> D[Add description]
    D --> E{Choose featured?}
    E -->|Yes| F[Mark as featured work]
    E -->|No| G[Add to regular portfolio]
    F --> H[Shown in bids]
    G --> H
    H --> I[Customer sees in bid card]
    I --> J[Increases win rate by 3x]
    J --> K[More jobs won]
    K --> A
```

---

## System Architecture Diagrams

### 1. High-Level System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        Web[React Web App<br/>Vite + TypeScript]
        Mobile[Progressive Web App<br/>Mobile Responsive]
    end
    
    subgraph "API Layer"
        Gateway[API Gateway<br/>Express + TypeScript]
        Auth[Authentication<br/>Clerk]
        REST[REST Endpoints]
        Socket[Socket.IO Server<br/>Real-Time Events]
    end
    
    subgraph "Business Logic Layer"
        Bidding[Bidding Engine]
        PreDiag[Pre-Diagnosis Engine]
        Matching[Skill Matching Engine]
        Pricing[Dynamic Pricing]
        Payments[Payment Processor]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL<br/>Primary Database)]
        Cache[(Redis<br/>Cache & Sessions)]
        Storage[Cloudinary<br/>Image Storage]
    end
    
    subgraph "External Services"
        Razorpay[Razorpay<br/>Payment Gateway]
        Exotel[Exotel<br/>Phone Masking]
        Maps[Google Maps API]
        SMS[SMS Gateway]
    end
    
    Web --> Gateway
    Mobile --> Gateway
    Gateway --> Auth
    Gateway --> REST
    Gateway --> Socket
    
    REST --> Bidding
    REST --> PreDiag
    REST --> Matching
    REST --> Pricing
    REST --> Payments
    
    Bidding --> DB
    PreDiag --> DB
    Matching --> DB
    Pricing --> DB
    Payments --> Razorpay
    
    Gateway --> Cache
    REST --> Storage
    
    Payments --> Razorpay
    REST --> Exotel
    REST --> Maps
    REST --> SMS
```

### 2. Database Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ PROVIDERS : "can be"
    USERS ||--o{ BOOKINGS : "creates as customer"
    PROVIDERS ||--o{ BOOKINGS : "accepts as provider"
    PROVIDERS ||--o{ BIDS : "submits"
    PROVIDERS ||--o{ PROVIDER_SKILLS : "has"
    PROVIDERS ||--o{ WORK_PORTFOLIO : "builds"
    
    BOOKINGS ||--o{ BIDS : "receives"
    BOOKINGS ||--o{ DIAGNOSIS_REPORTS : "has"
    BOOKINGS ||--|| PAYMENT_ORDERS : "linked to"
    BOOKINGS ||--o{ BOOKING_MESSAGES : "contains"
    BOOKINGS ||--o{ RATINGS : "receives"
    
    SERVICES ||--o{ BOOKINGS : "booked via"
    SERVICE_PRICE_CATALOG ||--o{ SERVICES : "provides pricing for"
    
    DIAGNOSIS_REPORTS ||--o{ EXPERT_VERIFICATIONS : "verified by"
    
    USERS {
        uuid id PK
        string fullName
        string email
        string phone
        string role
        timestamp createdAt
    }
    
    PROVIDERS {
        uuid id PK
        uuid userId FK
        string serviceCategory
        boolean isVerified
        decimal averageRating
        int completedJobs
    }
    
    BOOKINGS {
        uuid id PK
        uuid customerId FK
        uuid providerId FK
        string status
        decimal totalAmount
        timestamp scheduledAt
    }
    
    BIDS {
        uuid id PK
        uuid bookingId FK
        uuid providerId FK
        decimal bidAmount
        int estimatedArrivalMinutes
        string status
    }
    
    PROVIDER_SKILLS {
        uuid id PK
        uuid providerId FK
        string skillName
        string skillLevel
        int jobsCompleted
    }
```

### 3. Real-Time Event Flow

```mermaid
sequenceDiagram
    participant C as Customer Browser
    participant WS as WebSocket Server
    participant DB as Database
    participant P1 as Provider 1 Browser
    participant P2 as Provider 2 Browser
    participant P3 as Provider 3 Browser

    Note over C: Customer posts job request
    C->>WS: POST /api/bookings
    WS->>DB: Save booking (status: accepting_bids)
    DB-->>WS: Booking created
    WS->>WS: Find qualified providers within 5km
    
    par Broadcast to all qualified providers
        WS->>P1: Socket emit 'booking:new_request'
        WS->>P2: Socket emit 'booking:new_request'
        WS->>P3: Socket emit 'booking:new_request'
    end
    
    Note over P1,P3: Providers see job notification
    
    P1->>WS: POST /api/bookings/:id/bid (₹500)
    WS->>DB: Save bid
    WS->>C: Socket emit 'booking:new_bid'
    
    P2->>WS: POST /api/bookings/:id/bid (₹450)
    WS->>DB: Save bid
    WS->>C: Socket emit 'booking:new_bid'
    
    Note over C: Customer sees 2 bids in real-time
    
    C->>WS: POST /api/bookings/:id/accept-bid/P2
    WS->>DB: Update booking (status: confirmed, providerId: P2)
    
    par Notify all parties
        WS->>P2: Socket emit 'booking:bid_accepted' ✅
        WS->>P1: Socket emit 'booking:closed' ❌
        WS->>P3: Socket emit 'booking:closed' ❌
        WS->>C: Socket emit 'booking:confirmed'
    end
```

---

## Payment & Financial Flows

### 1. Complete Payment Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Created: Customer accepts bid
    Created --> Authorized: Customer pays ₹500 via Razorpay
    Authorized --> Held: Money held in escrow
    
    Held --> InProgress: Provider starts service
    InProgress --> Complete: Both parties confirm completion
    
    Complete --> DisputeWindow: 24-hour window starts
    
    state DisputeWindow {
        [*] --> Waiting: Timer running
        Waiting --> NoDispute: 24 hours pass
        Waiting --> DisputeFiled: Customer reports issue
    }
    
    DisputeWindow --> Investigating: Customer filed dispute
    Investigating --> FullRefund: Customer was right
    Investigating --> PartialRefund: Partial completion
    Investigating --> Rejected: Provider was right
    
    DisputeWindow --> Released: No disputes
    Rejected --> Released
    
    Released --> ProviderAccount: ₹465 transferred
    FullRefund --> CustomerAccount: ₹490 refunded (platform keeps 2%)
    PartialRefund --> Split: Split payment
    
    ProviderAccount --> [*]
    CustomerAccount --> [*]
    Split --> [*]
```

### 2. Revenue Split Breakdown

```mermaid
pie title Revenue Distribution per ₹500 Booking
    "Provider Earning" : 465
    "Platform Fee (Nimivo)" : 25
    "Razorpay Payment Gateway" : 10
```

### 3. Subscription vs Pay-Per-Lead Model

```mermaid
flowchart TD
    Provider[Provider joins Nimivo] --> Choose{Choose pricing model}
    
    Choose -->|Free Tier| Free[₹49 per bid opportunity]
    Choose -->|Pro Tier| Pro[₹599/month subscription]
    Choose -->|Premium Tier| Premium[₹999/month subscription]
    
    Free --> Usage1[Provider bids on 10 jobs/month]
    Pro --> Usage2[Provider bids on 20 jobs/month]
    Premium --> Usage3[Provider bids on 30 jobs/month]
    
    Usage1 --> Cost1[Cost: ₹490/month]
    Usage2 --> Cost2[Cost: ₹599/month<br/>₹0 per bid]
    Usage3 --> Cost3[Cost: ₹999/month<br/>₹0 per bid + priority placement]
    
    Cost1 --> Decision1{Should upgrade?}
    Decision1 -->|Yes, bidding > 12 times/month| Upgrade1[Switch to Pro and save money]
    Decision1 -->|No| Stay1[Stay on Free tier]
    
    Cost2 --> Happy2[Happy using Pro]
    Cost3 --> Happy3[Happy using Premium]
```

---

## Trust & Safety Workflows

### 1. Photo Diagnosis Verification Flow

```mermaid
flowchart TD
    Start[Provider diagnoses issue] --> Different{Different from pre-diagnosis?}
    
    Different -->|No| Proceed[Proceed with agreed price]
    Different -->|Yes| Camera[Open in-app camera]
    
    Camera --> Capture[Capture photo of issue]
    Capture --> GPS[GPS + timestamp auto-added]
    GPS --> Issue[Select issue type from dropdown]
    Issue --> Quote[Enter quoted price]
    Quote --> Submit[Submit diagnosis report]
    
    Submit --> System[System checks market price database]
    System --> Compare{Quote vs Market Price}
    
    Compare -->|Within range| Notify1[Notify customer: Fair price]
    Compare -->|Above range| Notify2[Notify customer: Above market rate by X%]
    
    Notify1 --> CustomerSee[Customer sees photo + diagnosis]
    Notify2 --> CustomerSee
    
    CustomerSee --> Decision{Customer decision}
    
    Decision -->|Approve| Work[Provider proceeds]
    Decision -->|Decline| Cancel[Booking canceled]
    Decision -->|Get Expert| Expert[Send to expert panel]
    
    Expert --> ExpertReview[Expert reviews photo in 5-10 min]
    ExpertReview --> Verdict[Expert verdict + fair price range]
    Verdict --> CustomerDecide{Customer decides}
    
    CustomerDecide -->|Accept expert price| Negotiate[Provider agrees to expert price]
    CustomerDecide -->|Still decline| Cancel
    
    Negotiate --> Work
    Work --> PhotoStore[(Photo stored as permanent record)]
    PhotoStore --> Portfolio[Added to provider portfolio]
```

### 2. Identity Verification Process

```mermaid
stateDiagram-v2
    [*] --> Unverified: Provider signs up
    Unverified --> AadhaarSubmitted: Uploads Aadhaar card
    AadhaarSubmitted --> OCRExtraction: System extracts details via OCR
    OCRExtraction --> Verified: Auto-verified
    OCRExtraction --> ManualReview: Auto-verification failed
    
    ManualReview --> Verified: Admin approves
    ManualReview --> Rejected: Fake/invalid document
    
    Verified --> BackgroundCheck: Optional background check
    BackgroundCheck --> FullyVerified: Background clear
    BackgroundCheck --> Flagged: Background issues found
    
    Flagged --> Investigation: Manual investigation
    Investigation --> Approved: Issues resolved
    Investigation --> Suspended: Account suspended
    
    FullyVerified --> Badge: "Verified Pro" badge shown
    Badge --> HigherVisibility: Gets 3x more bid acceptances
    
    Rejected --> [*]
    Suspended --> [*]
```

### 3. Dispute Resolution Workflow

```mermaid
flowchart TD
    Start[Customer files dispute] --> Evidence[Customer uploads evidence photos]
    Evidence --> Reason[Selects dispute reason]
    
    Reason --> Type{Dispute type}
    
    Type -->|Work not completed| WorkIssue[Work quality issue]
    Type -->|Wrong diagnosis| DiagIssue[Diagnosis was wrong]
    Type -->|Provider no-show| NoShow[Provider didn't arrive]
    Type -->|Damage/theft| Safety[Safety/damage issue]
    
    WorkIssue --> Admin1[Assign to admin reviewer]
    DiagIssue --> Admin1
    NoShow --> AutoRefund[Auto-refund 100%]
    Safety --> Admin2[Assign to senior admin + legal team]
    
    Admin1 --> Review[Review evidence from both sides]
    Admin2 --> Review
    
    Review --> Compare[Compare: Original diagnosis vs completion photos]
    Compare --> Decision{Admin decision}
    
    Decision -->|Customer right| Refund100[Full refund to customer]
    Decision -->|Partial completion| Refund50[Partial refund]
    Decision -->|Provider right| NoRefund[No refund, payment to provider]
    
    Refund100 --> ProviderPenalty[Provider rating penalty]
    Refund50 --> Split[Split payment proportionally]
    NoRefund --> CustomerWarning[Customer warned about false disputes]
    
    ProviderPenalty --> Close[Dispute closed]
    Split --> Close
    CustomerWarning --> Close
    AutoRefund --> Close
```

---

## Real-Time Communication Flows

### 1. In-App Chat System

```mermaid
sequenceDiagram
    participant C as Customer
    participant WS as WebSocket Server
    participant DB as Database
    participant P as Provider

    Note over C,P: Booking confirmed, chat enabled
    
    C->>WS: Connect to Socket.IO
    WS->>C: Connection established
    WS->>WS: Join room: booking_123
    
    P->>WS: Connect to Socket.IO
    WS->>P: Connection established
    WS->>WS: Join room: booking_123
    
    C->>WS: Send message: "I'm at the gate"
    WS->>DB: Store message
    WS->>P: Socket emit 'message:new'
    P->>WS: Mark as read
    WS->>DB: Update read_at timestamp
    WS->>C: Socket emit 'message:read'
    
    P->>WS: Send message: "Coming in 2 minutes"
    WS->>DB: Store message
    WS->>C: Socket emit 'message:new'
    
    C->>WS: Send image: photo of location
    WS->>DB: Store message with image_url
    WS->>P: Socket emit 'message:new'
    
    Note over C,P: Real-time messaging continues...
    
    P->>WS: Mark service complete
    WS->>WS: Close chat room after 2 hours
    WS->>C: Disconnect
    WS->>P: Disconnect
```

### 2. Live Tracking System

```mermaid
stateDiagram-v2
    [*] --> BidAccepted: Customer accepts bid
    BidAccepted --> OnTheWay: Provider marks 'On the way'
    
    state OnTheWay {
        [*] --> GPS: Enable GPS tracking
        GPS --> Update: Send location every 30 seconds
        Update --> Customer: Customer sees live map
        Customer --> Update
    }
    
    OnTheWay --> Arrived: Provider marks 'Arrived'
    Arrived --> ServiceInProgress: Provider starts work
    
    state ServiceInProgress {
        [*] --> Timer: Timer starts
        Timer --> ElapsedTime: Show elapsed time to customer
        ElapsedTime --> Timer
    }
    
    ServiceInProgress --> Complete: Provider marks complete
    Complete --> [*]
```

### 3. Push Notification Strategy

```mermaid
flowchart TD
    Event[System Event Occurs] --> Type{Event Type}
    
    Type -->|New Job Posted| Notify1[Notify nearby qualified providers]
    Type -->|New Bid Received| Notify2[Notify customer]
    Type -->|Bid Accepted| Notify3[Notify winning provider]
    Type -->|Provider Arriving| Notify4[Notify customer: ETA 5 min]
    Type -->|Payment Released| Notify5[Notify provider: Money on the way]
    Type -->|Review Received| Notify6[Notify provider: New review]
    
    Notify1 --> Channel1{Provider online?}
    Channel1 -->|Yes| InApp1[In-app notification]
    Channel1 -->|No| Push1[Push notification + SMS]
    
    Notify2 --> InApp2[In-app + sound alert]
    Notify3 --> Push3[Push notification + SMS + Email]
    Notify4 --> Push4[Push notification]
    Notify5 --> Push5[Push notification + SMS]
    Notify6 --> InApp6[In-app notification]
    
    InApp1 --> End[User sees notification]
    Push1 --> End
    InApp2 --> End
    Push3 --> End
    Push4 --> End
    Push5 --> End
    InApp6 --> End
```

---

## Additional Specialized Workflows

### 1. SOS Emergency Mode Activation

```mermaid
flowchart TD
    Emergency[Customer taps 'SOS - Need Help Now'] --> Location[GPS location captured]
    Location --> Category[Select emergency category]
    Category --> Broadcast[Broadcast to ALL providers in 10km radius]
    Broadcast --> Surge[Show surge pricing: 2x normal rate]
    
    Surge --> Wait[Wait for bids]
    Wait --> Timer{Bids received within 2 minutes?}
    
    Timer -->|Yes| Show[Show bids, customer picks fastest]
    Timer -->|No| Expand[Expand radius to 15km + increase surge to 2.5x]
    
    Expand --> Wait2[Wait for bids]
    Wait2 --> Timer2{Bids received?}
    
    Timer2 -->|Yes| Show
    Timer2 -->|No| Fallback[Show: No providers available, try partner shops]
    
    Show --> Assign[Provider assigned]
    Assign --> Track[Real-time tracking]
    Track --> Priority[Provider marked as 'Emergency Job' - gets priority]
```

### 2. Recurring Booking Automation

```mermaid
stateDiagram-v2
    [*] --> FirstBooking: Customer books maid service
    FirstBooking --> Complete: Service completed
    Complete --> OfferRecurring: App offers: "Book weekly?"
    
    OfferRecurring --> CustomerAccepts: Customer taps "Yes, every Saturday 10 AM"
    CustomerAccepts --> SetSchedule: System creates recurring schedule
    
    state SetSchedule {
        [*] --> Save: Save: Every Saturday, 10 AM, ₹500
        Save --> PaymentMethod: Link payment method for auto-charge
        PaymentMethod --> ProviderLock: Lock same provider
    }
    
    SetSchedule --> AutoReminder: 24 hours before next booking
    AutoReminder --> Confirm: Ask customer: "Confirm booking for tomorrow?"
    
    Confirm --> CustomerConfirms: Customer confirms
    Confirm --> CustomerSkips: Customer skips this week
    
    CustomerConfirms --> AutoCharge: Auto-charge ₹500
    AutoCharge --> ProviderNotified: Provider notified
    ProviderNotified --> ServiceOccurs: Service occurs as scheduled
    
    ServiceOccurs --> NextWeek: Next week cycle
    NextWeek --> AutoReminder
    
    CustomerSkips --> NextWeek
```

### 3. Provider Skill Verification Test Flow

```mermaid
flowchart TD
    Start[Provider wants 'Expert Verified' badge] --> Apply[Applies for skill verification]
    Apply --> Category[Select skill: 'AC Capacitor Replacement']
    Category --> Quiz[Take expert-designed quiz]
    
    Quiz --> Q1[Question 1: How to identify blown capacitor?]
    Q1 --> Q2[Question 2: Safety precautions?]
    Q2 --> Q3[Question 3: Testing with multimeter?]
    Q3 --> Q4[Question 4: Common mistakes?]
    Q4 --> Q5[Question 5: Price estimation factors?]
    
    Q5 --> Score{Quiz Score}
    
    Score -->|< 60%| Fail[Failed - can retake in 7 days]
    Score -->|60-79%| Pass[Passed - 'Verified' badge]
    Score -->|80-100%| Expert[Passed - 'Expert Verified' badge]
    
    Pass --> Benefit1[Shown in skill-based matching]
    Expert --> Benefit2[Shown in skill-based matching + priority placement]
    
    Benefit1 --> Earnings1[Earn 10% more per job]
    Benefit2 --> Earnings2[Earn 20% more per job]
    
    Fail --> Retry[Study materials provided]
    Retry --> Start
```

---

## Summary: Key Workflow Priorities

### Week 1-2 (Must Build)
1. ✅ Complete Booking Flow
2. ✅ Bidding System Event Flow
3. ✅ Payment Escrow Lifecycle

### Week 3-4 (Important)
4. ✅ Photo Diagnosis Verification
5. ✅ In-App Chat System
6. ✅ Provider Onboarding

### Week 5-6 (Enhancement)
7. ✅ Skill Verification
8. ✅ Live Tracking
9. ✅ Recurring Bookings

**All diagrams are implementation-ready. Use this document as your visual spec.**

---

**END OF WORKFLOW DIAGRAMS**
