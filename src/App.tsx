import { useMemo, useState, useEffect } from 'react'
import type { FormEvent, SyntheticEvent } from 'react'
import studySwapUniversityLogo from './assets/studyswap-university-logo.jpg'
import './App.css'
import {
  IconSearch,
  IconHome,
  IconGrid,
  IconPlus,
  IconChat,
  IconUser,
  IconHeart,
  IconCheck,
  IconShieldCheck,
  IconArrowRight,
  IconArrowLeft,
  IconClose,
  IconMenu,
  IconLocation,
  IconExchange,
  IconBookOpen,
  IconClock,
  IconSend,
  IconTag,
  IconGift,
  IconEye,
  IconEyeOff,
} from './icons'

export type ListingType = 'Sell' | 'Rent' | 'Swap' | 'Borrow' | 'Free'

export type Listing = {
  id: number
  title: string
  course: string
  category: string
  type: ListingType
  price: string
  imageUrl: string
  owner: string
  area: string
  condition: string
  description?: string
  postedAt?: string
}

const initialListings: Listing[] = [
  {
    id: 1,
    title: 'Engineering Mechanics: Statics & Dynamics',
    course: 'CE 201 · 5th Edition (Hibbeler)',
    category: 'Textbooks',
    type: 'Sell',
    price: '₱380',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=640&q=80',
    owner: 'Miguel A.',
    area: 'North Campus Library',
    condition: 'Like new',
    description: 'Clean pages, no heavy highlights. Perfect for 2nd year civil and mechanical engineering students.',
    postedAt: '2h ago',
  },
  {
    id: 2,
    title: 'Casio fx-991ES Plus II Scientific Calculator',
    course: 'General Engineering / Board Exam Approved',
    category: 'Calculators',
    type: 'Rent',
    price: '₱35 / week',
    imageUrl: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=640&q=80',
    owner: 'Anne L.',
    area: 'Main Library 2F',
    condition: 'Excellent',
    description: 'Fully functional with battery cover and hard case. Ideal for midterm or finals exam week.',
    postedAt: '5h ago',
  },
  {
    id: 3,
    title: 'Architecture & Engineering Drafting Kit',
    course: 'T-Square, Triangular Scale, 30/60 & 45 Triangles',
    category: 'Drafting & Art',
    type: 'Swap',
    price: 'Open to trade',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=640&q=80',
    owner: 'Bea R.',
    area: 'South Gate Canteen',
    condition: 'Used once',
    description: 'Complete 12-piece professional drawing set. Looking to swap for a lab coat (M) or scientific calculator.',
    postedAt: '1d ago',
  },
  {
    id: 4,
    title: 'Organic Chemistry: Structure & Function',
    course: 'CHEM 102 · 8th Edition',
    category: 'Textbooks',
    type: 'Sell',
    price: '₱450',
    imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=640&q=80',
    owner: 'Jon C.',
    area: 'Engineering Building Lobby',
    condition: 'Good condition',
    description: 'Contains neatly highlighted summary sections and chapter review notes.',
    postedAt: '1d ago',
  },
  {
    id: 5,
    title: 'Lab Coat (White, 100% Cotton, Medium)',
    course: 'Chemistry & Biology Laboratory Uniform',
    category: 'Lab Equipment',
    type: 'Borrow',
    price: 'Free to borrow',
    imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=640&q=80',
    owner: 'Tess M.',
    area: 'Science Hall 304',
    condition: 'Clean / Freshly washed',
    description: 'Available for semester-long or weekly loan to fellow STEM classmates.',
    postedAt: '2d ago',
  },
  {
    id: 6,
    title: 'Winsor & Newton Acrylic Paint Set + Brushes',
    course: 'Fine Arts & Architecture Studio 24-Color Set',
    category: 'Drafting & Art',
    type: 'Free',
    price: 'Free / Giveaway',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=640&q=80',
    owner: 'Lex P.',
    area: 'Arts & Design Wing',
    condition: 'Unused / Sealed tubes',
    description: 'Extra materials from completed studio subject. Free for any student who can put them to good use.',
    postedAt: '3d ago',
  },
]

const fallbackPhoto = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=640&q=80'
const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackPhoto
}

type Message = {
  from: string
  text: string
  time: string
}

type Conversation = {
  id: number
  name: string
  initial: string
  item: string
  itemPrice: string
  time: string
  unread: boolean
  messages: Message[]
}

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: 'Miguel A.',
    initial: 'M',
    item: 'Engineering Mechanics: Statics & Dynamics',
    itemPrice: '₱380 · Buy',
    time: '10:24 AM',
    unread: true,
    messages: [
      { from: 'Miguel A.', text: 'Hi Juan! Yes, the textbook is still available for CE 201.', time: '10:20 AM' },
      { from: 'You', text: 'Awesome! Can we meet at the North Campus Library tomorrow around 2 PM?', time: '10:22 AM' },
      { from: 'Miguel A.', text: '2 PM at the library lobby sounds perfect. See you there!', time: '10:24 AM' },
    ],
  },
  {
    id: 2,
    name: 'Anne L.',
    initial: 'A',
    item: 'Casio fx-991ES Plus II Scientific Calculator',
    itemPrice: '₱35/week · Rent',
    time: 'Yesterday',
    unread: false,
    messages: [
      { from: 'Anne L.', text: 'Hello! I reserved the scientific calculator for your exam week until Friday.', time: 'Yesterday' },
      { from: 'You', text: 'Thank you so much Anne, really appreciate the quick turnaround.', time: 'Yesterday' },
    ],
  },
  {
    id: 3,
    name: 'Bea R.',
    initial: 'B',
    item: 'Architecture & Engineering Drafting Kit',
    itemPrice: 'Open to trade · Swap',
    time: 'Mon',
    unread: false,
    messages: [
      { from: 'Bea R.', text: 'Hey there! I am looking to swap this drafting kit for a medium lab coat or calculator.', time: 'Mon' },
    ],
  },
]

export function App() {
  const [view, setView] = useState<'home' | 'browse' | 'post' | 'profile' | 'inbox'>('home')
  const [auth, setAuth] = useState<'signin' | 'signup' | null>(null)
  const [filter, setFilter] = useState<string>('All')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [search, setSearch] = useState<string>('')
  const [listings, setListings] = useState<Listing[]>(initialListings)
  const [saved, setSaved] = useState<number[]>([1, 2])
  const [selected, setSelected] = useState<Listing | null>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [studentName, setStudentName] = useState<string | null>('Juan Dela Cruz')
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeChatId, setActiveChatId] = useState<number>(1)
  const [mobileChatOpen, setMobileChatOpen] = useState<boolean>(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const unreadCount = useMemo(() => {
    return conversations.filter((c) => c.unread).length
  }, [conversations])

  const visibleListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesType = filter === 'All' || item.type === filter
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
      const query = search.trim().toLowerCase()
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query) ||
        item.area.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)

      return matchesType && matchesCategory && matchesSearch
    })
  }, [listings, filter, categoryFilter, search])

  const toggleSaved = (id: number) => {
    setSaved((items) => {
      const isSaved = items.includes(id)
      const next = isSaved ? items.filter((x) => x !== id) : [...items, id]
      showToast(isSaved ? 'Removed from saved items' : 'Saved to your bookmarks')
      return next
    })
  }

  const goToBrowse = (chosenType = 'All', chosenCategory = 'All', initialSearch = '') => {
    setFilter(chosenType)
    setCategoryFilter(chosenCategory)
    if (initialSearch !== undefined) setSearch(initialSearch)
    setView('browse')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStartChatFromListing = (item: Listing) => {
    setSelected(null)
    const existingIndex = conversations.findIndex((c) => c.name === item.owner)
    if (existingIndex >= 0) {
      setActiveChatId(conversations[existingIndex].id)
    } else {
      const newConv: Conversation = {
        id: Date.now(),
        name: item.owner,
        initial: item.owner.charAt(0),
        item: item.title,
        itemPrice: `${item.price} · ${item.type}`,
        time: 'Just now',
        unread: false,
        messages: [
          {
            from: 'You',
            text: `Hi ${item.owner}! I saw your listing for "${item.title}" on StudySwap and I am interested. Is it still available?`,
            time: 'Just now',
          },
        ],
      }
      setConversations([newConv, ...conversations])
      setActiveChatId(newConv.id)
    }
    setView('inbox')
    setMobileChatOpen(true)
    showToast(`Conversation started with ${item.owner}`)
  }

  const handleCreateListing = (newListingData: Omit<Listing, 'id' | 'postedAt'>) => {
    const newListing: Listing = {
      ...newListingData,
      id: Date.now(),
      postedAt: 'Just now',
    }
    setListings([newListing, ...listings])
    showToast('Listing posted successfully!')
    setView('browse')
    setFilter('All')
    setCategoryFilter('All')
  }

  // Close mobile menu on ESC or outside click
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 840) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="app-container">
      {toast && <div className="toast-notification"><IconCheck size={16} /><span>{toast}</span></div>}

      {/* Top Header */}
      <header className="site-header">
        <div className="header-inner">
          <button className="brand-logo-btn" onClick={() => setView('home')} aria-label="Go to StudySwap home">
            <img src={studySwapUniversityLogo} alt="StudySwap Logo" className="brand-img" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <div className="brand-text-wrap">
              <span className="brand-name">StudySwap</span>
              <span className="campus-badge"><IconShieldCheck size={12} /> CIT Verified</span>
            </div>
          </button>

          <nav className="desktop-navigation">
            <button className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
              Discover
            </button>
            <button className={`nav-link ${view === 'browse' ? 'active' : ''}`} onClick={() => goToBrowse()}>
              Browse
            </button>
            <button className={`nav-link ${view === 'post' ? 'active' : ''}`} onClick={() => setView('post')}>
              Post an Item
            </button>
            <button className={`nav-link nav-link-inbox ${view === 'inbox' ? 'active' : ''}`} onClick={() => { setView('inbox'); setMobileChatOpen(false) }}>
              Inbox
              {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
            </button>
          </nav>

          <div className="header-actions">
            {studentName ? (
              <button className="user-profile-chip" onClick={() => setView('profile')} aria-label="View profile">
                <span className="avatar-letter">J</span>
                <span className="user-name-text">{studentName}</span>
              </button>
            ) : (
              <div className="auth-btn-group">
                <button className="btn-secondary" onClick={() => setAuth('signin')}>
                  Log in
                </button>
                <button className="btn-primary" onClick={() => setAuth('signup')}>
                  Join Campus
                </button>
              </div>
            )}
            <button className="mobile-menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
              {menuOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {menuOpen && (
          <div className="mobile-dropdown-menu">
            <div className="mobile-dropdown-header">
              <span className="mobile-dropdown-title">Menu</span>
              {studentName && <span className="mobile-user-status"><IconShieldCheck size={14} /> {studentName}</span>}
            </div>
            <button className={`dropdown-item ${view === 'home' ? 'active' : ''}`} onClick={() => { setView('home'); setMenuOpen(false) }}>
              <IconHome size={18} /> Discover
            </button>
            <button className={`dropdown-item ${view === 'browse' ? 'active' : ''}`} onClick={() => goToBrowse()}>
              <IconGrid size={18} /> Browse Materials
            </button>
            <button className={`dropdown-item ${view === 'post' ? 'active' : ''}`} onClick={() => { setView('post'); setMenuOpen(false) }}>
              <IconPlus size={18} /> Post an Item
            </button>
            <button className={`dropdown-item ${view === 'inbox' ? 'active' : ''}`} onClick={() => { setView('inbox'); setMobileChatOpen(false); setMenuOpen(false) }}>
              <IconChat size={18} /> Inbox {unreadCount > 0 && <span className="unread-pill">{unreadCount} new</span>}
            </button>
            <button className={`dropdown-item ${view === 'profile' ? 'active' : ''}`} onClick={() => { setView('profile'); setMenuOpen(false) }}>
              <IconUser size={18} /> Student Dashboard
            </button>
            {!studentName ? (
              <div className="mobile-dropdown-auth">
                <button className="btn-primary full-width" onClick={() => { setAuth('signin'); setMenuOpen(false) }}>
                  Sign In to StudySwap
                </button>
              </div>
            ) : (
              <div className="mobile-dropdown-auth">
                <button className="btn-secondary full-width" onClick={() => { setStudentName(null); setMenuOpen(false); showToast('Logged out') }}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {view === 'home' && (
          <HomeView
            onBrowse={goToBrowse}
            onPost={() => setView('post')}
            search={search}
            setSearch={setSearch}
            listings={listings}
            onSelect={setSelected}
            saved={saved}
            onSave={toggleSaved}
          />
        )}

        {view === 'browse' && (
          <BrowseView
            listings={visibleListings}
            filter={filter}
            setFilter={setFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            search={search}
            setSearch={setSearch}
            onSelect={setSelected}
            saved={saved}
            onSave={toggleSaved}
          />
        )}

        {view === 'post' && (
          <PostView
            studentName={studentName}
            onAuth={() => setAuth('signup')}
            onCreateListing={handleCreateListing}
          />
        )}

        {view === 'profile' && (
          <ProfileView
            studentName={studentName}
            savedListings={listings.filter((item) => saved.includes(item.id))}
            onSelect={setSelected}
            onSave={toggleSaved}
            onAuth={() => setAuth('signup')}
            onInbox={() => { setView('inbox'); setMobileChatOpen(false) }}
            onPost={() => setView('post')}
          />
        )}

        {view === 'inbox' && (
          <InboxView
            studentName={studentName}
            conversations={conversations}
            setConversations={setConversations}
            activeId={activeChatId}
            setActiveId={setActiveChatId}
            mobileChatOpen={mobileChatOpen}
            setMobileChatOpen={setMobileChatOpen}
            onAuth={() => setAuth('signin')}
            onViewItem={(itemTitle) => {
              const matched = listings.find((l) => l.title.toLowerCase().includes(itemTitle.toLowerCase()) || itemTitle.toLowerCase().includes(l.title.toLowerCase()))
              if (matched) setSelected(matched)
              else goToBrowse('All', 'All', itemTitle)
            }}
          />
        )}
      </main>

      {/* Bottom Mobile Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <button
          className={`mobile-tab ${view === 'home' ? 'active' : ''}`}
          onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <IconHome size={22} />
          <span>Home</span>
        </button>

        <button
          className={`mobile-tab ${view === 'browse' ? 'active' : ''}`}
          onClick={() => goToBrowse()}
        >
          <IconGrid size={22} />
          <span>Browse</span>
        </button>

        <button
          className={`mobile-tab mobile-tab-post ${view === 'post' ? 'active' : ''}`}
          onClick={() => setView('post')}
          aria-label="Post an item"
        >
          <div className="tab-post-circle">
            <IconPlus size={22} />
          </div>
          <span>Post</span>
        </button>

        <button
          className={`mobile-tab ${view === 'inbox' ? 'active' : ''}`}
          onClick={() => { setView('inbox'); setMobileChatOpen(false) }}
        >
          <div className="tab-icon-wrapper">
            <IconChat size={22} />
            {unreadCount > 0 && <span className="tab-badge">{unreadCount}</span>}
          </div>
          <span>Inbox</span>
        </button>

        <button
          className={`mobile-tab ${view === 'profile' ? 'active' : ''}`}
          onClick={() => setView('profile')}
        >
          <IconUser size={22} />
          <span>Profile</span>
        </button>
      </nav>

      {/* Auth Modal */}
      {auth && (
        <AuthModal
          mode={auth}
          onClose={() => setAuth(null)}
          onSwitch={() => setAuth(auth === 'signin' ? 'signup' : 'signin')}
          onSuccess={(name) => {
            setStudentName(name)
            setAuth(null)
            showToast(`Signed in as ${name}`)
          }}
        />
      )}

      {/* Listing Detail Modal / Bottom Sheet */}
      {selected && (
        <ItemDetailModal
          item={selected}
          saved={saved.includes(selected.id)}
          onClose={() => setSelected(null)}
          onSave={() => toggleSaved(selected.id)}
          onStartChat={() => handleStartChatFromListing(selected)}
        />
      )}
    </div>
  )
}

/* ==========================================================================
   Home View Component
   ========================================================================== */
type HomeViewProps = {
  onBrowse: (type?: string, category?: string, search?: string) => void
  onPost: () => void
  search: string
  setSearch: (value: string) => void
  listings: Listing[]
  onSelect: (item: Listing) => void
  saved: number[]
  onSave: (id: number) => void
}

function HomeView({ onBrowse, onPost, search, setSearch, listings, onSelect, saved, onSave }: HomeViewProps) {
  const quickCategories = [
    { label: 'Calculators', query: 'calculator', category: 'Calculators' },
    { label: 'Engineering Books', query: 'engineering', category: 'Textbooks' },
    { label: 'Drafting Sets', query: 'drafting', category: 'Drafting & Art' },
    { label: 'Lab Equipment', query: 'lab', category: 'Lab Equipment' },
    { label: 'Free Materials', type: 'Free' },
  ]

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <IconShieldCheck size={14} className="hero-badge-icon" />
            <span>Verified Campus Academic Exchange</span>
          </div>

          <h1 className="hero-title">
            Buy, sell, & swap textbooks and gear with students on your campus.
          </h1>

          <p className="hero-description">
            Pass on unused textbooks, calculators, drafting kits, and lab tools to fellow classmates safely and affordably.
          </p>

          <div className="hero-search-wrapper">
            <form
              className="hero-search-form"
              onSubmit={(e) => {
                e.preventDefault()
                onBrowse('All', 'All', search)
              }}
            >
              <IconSearch size={20} className="search-input-icon" />
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search textbooks, calculators, lab coats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn-primary search-submit-btn">
                Search
              </button>
            </form>

            <div className="hero-quick-tags">
              <span className="quick-tags-label">Quick search:</span>
              <div className="tags-scroll-row">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.label}
                    className="quick-tag-pill"
                    onClick={() => {
                      if (cat.type) onBrowse(cat.type, 'All', '')
                      else onBrowse('All', cat.category || 'All', cat.query || '')
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <strong>2,400+</strong>
              <span>Verified Students</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <strong>860+</strong>
              <span>Items Shared</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <strong>100%</strong>
              <span>On-Campus Meetups</span>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Action Grid */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2 className="section-title">What are you looking to do?</h2>
            <p className="section-subtitle">Choose an exchange option that fits your semester</p>
          </div>
          <button className="link-action-btn" onClick={() => onBrowse()}>
            <span>View all listings</span>
            <IconArrowRight size={16} />
          </button>
        </div>

        <div className="purpose-cards-grid">
          {[
            { title: 'Buy', type: 'Sell', desc: 'Find discounted textbooks & kits', icon: <IconTag size={22} />, color: 'emerald' },
            { title: 'Sell', type: 'Sell', desc: 'Turn past semester items to cash', icon: <IconPlus size={22} />, color: 'indigo', isPost: true },
            { title: 'Swap', type: 'Swap', desc: 'Direct trade with fellow students', icon: <IconExchange size={22} />, color: 'purple' },
            { title: 'Borrow', type: 'Borrow', desc: 'Temporary use for project or exam', icon: <IconClock size={22} />, color: 'sky' },
            { title: 'Rent', type: 'Rent', desc: 'Rent by week or entire semester', icon: <IconBookOpen size={22} />, color: 'amber' },
          ].map((item) => (
            <button
              key={item.title}
              className={`purpose-card purpose-${item.color}`}
              onClick={() => {
                if (item.isPost) onPost()
                else onBrowse(item.type)
              }}
            >
              <div className="purpose-icon-bubble">{item.icon}</div>
              <div className="purpose-card-text">
                <span className="purpose-card-title">{item.title}</span>
                <span className="purpose-card-desc">{item.desc}</span>
              </div>
              <div className="purpose-card-arrow">
                <IconArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured / Fresh Listings */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2 className="section-title">Recently Added on Campus</h2>
            <p className="section-subtitle">Verified listings available for immediate meetup</p>
          </div>
          <button className="link-action-btn" onClick={() => onBrowse()}>
            <span>Browse all ({listings.length})</span>
            <IconArrowRight size={16} />
          </button>
        </div>

        <ListingGrid items={listings.slice(0, 6)} onSelect={onSelect} saved={saved} onSave={onSave} />
      </section>

      {/* Trust & Safety Campus Banner */}
      <section className="campus-trust-banner">
        <div className="trust-banner-content">
          <div className="trust-badge">
            <IconShieldCheck size={16} /> Verified Institutional Community
          </div>
          <h2 className="trust-title">Built specifically for campus safety.</h2>
          <p className="trust-description">
            StudySwap connects students using verified school emails. Meet up at designated campus spots like the library, cafeteria, or student lounge with full peace of mind.
          </p>

          <div className="trust-pillars">
            <div className="trust-pillar">
              <div className="trust-pillar-icon"><IconShieldCheck size={20} /></div>
              <div>
                <strong>Institutional Verification</strong>
                <p>Only students with active university accounts can post & message.</p>
              </div>
            </div>
            <div className="trust-pillar">
              <div className="trust-pillar-icon"><IconLocation size={20} /></div>
              <div>
                <strong>Safe On-Campus Spots</strong>
                <p>Public meetup zones inside campus prevent delivery hassles.</p>
              </div>
            </div>
            <div className="trust-pillar">
              <div className="trust-pillar-icon"><IconGift size={20} /></div>
              <div>
                <strong>Zero Transaction Fees</strong>
                <p>100% peer-to-peer without hidden platform cuts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ==========================================================================
   Browse View Component
   ========================================================================== */
type BrowseViewProps = {
  listings: Listing[]
  filter: string
  setFilter: (val: string) => void
  categoryFilter: string
  setCategoryFilter: (val: string) => void
  search: string
  setSearch: (val: string) => void
  onSelect: (item: Listing) => void
  saved: number[]
  onSave: (id: number) => void
}

function BrowseView({
  listings,
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  search,
  setSearch,
  onSelect,
  saved,
  onSave,
}: BrowseViewProps) {
  const types: Array<{ label: string; value: string }> = [
    { label: 'All Types', value: 'All' },
    { label: 'For Sale', value: 'Sell' },
    { label: 'Rentals', value: 'Rent' },
    { label: 'Swaps', value: 'Swap' },
    { label: 'Borrow', value: 'Borrow' },
    { label: 'Free', value: 'Free' },
  ]

  const categories = ['All', 'Textbooks', 'Calculators', 'Drafting & Art', 'Lab Equipment']

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1 className="browse-title">Marketplace</h1>
        <p className="browse-subtitle">Browse academic gear, books, and resources shared by students.</p>

        {/* Search Bar */}
        <div className="browse-search-bar">
          <IconSearch size={20} className="search-bar-icon" />
          <input
            type="text"
            className="browse-search-input"
            placeholder="Search by title, course code (e.g. CE 201), or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search-btn" onClick={() => setSearch('')} aria-label="Clear search">
              <IconClose size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="filter-section">
          <div className="filter-chips-row">
            <span className="filter-group-label">Type:</span>
            {types.map((t) => (
              <button
                key={t.value}
                className={`filter-chip ${filter === t.value ? 'active' : ''}`}
                onClick={() => setFilter(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="filter-chips-row categories-row">
            <span className="filter-group-label">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip category-chip ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="browse-results-bar">
          <span className="results-count">
            Showing <strong>{listings.length}</strong> {listings.length === 1 ? 'material' : 'materials'}
          </span>
          {(filter !== 'All' || categoryFilter !== 'All' || search) && (
            <button
              className="reset-filters-btn"
              onClick={() => {
                setFilter('All')
                setCategoryFilter('All')
                setSearch('')
              }}
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-circle">
            <IconSearch size={32} />
          </div>
          <h3>No matching materials found</h3>
          <p>Try adjusting your search terms or clearing your active filters.</p>
          <button
            className="btn-secondary"
            onClick={() => {
              setFilter('All')
              setCategoryFilter('All')
              setSearch('')
            }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <ListingGrid items={listings} onSelect={onSelect} saved={saved} onSave={onSave} />
      )}
    </div>
  )
}

/* ==========================================================================
   Listing Grid & Card Components
   ========================================================================== */
function ListingGrid({
  items,
  onSelect,
  saved,
  onSave,
}: {
  items: Listing[]
  onSelect: (item: Listing) => void
  saved: number[]
  onSave: (id: number) => void
}) {
  return (
    <div className="listing-cards-grid">
      {items.map((item) => {
        const isSaved = saved.includes(item.id)
        return (
          <article className="listing-card" key={item.id}>
            <div className="card-image-wrap" onClick={() => onSelect(item)} role="button" tabIndex={0}>
              <img src={item.imageUrl} alt={item.title} className="card-image" onError={handleImageError} loading="lazy" />
              <span className={`type-badge badge-${item.type.toLowerCase()}`}>{item.type}</span>
              {item.condition && <span className="condition-pill">{item.condition}</span>}
            </div>

            <button
              className={`card-bookmark-btn ${isSaved ? 'is-saved' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                onSave(item.id)
              }}
              aria-label={isSaved ? 'Remove from saved' : 'Save item'}
            >
              <IconHeart size={18} filled={isSaved} />
            </button>

            <div className="card-details" onClick={() => onSelect(item)} role="button" tabIndex={0}>
              <div className="card-price-row">
                <span className="card-price">{item.price}</span>
                {item.postedAt && <span className="card-time">{item.postedAt}</span>}
              </div>

              <h3 className="card-title" title={item.title}>
                {item.title}
              </h3>
              <p className="card-course">{item.course}</p>

              <div className="card-location-row">
                <IconLocation size={14} className="location-pin-icon" />
                <span>{item.area}</span>
              </div>

              <div className="card-footer-seller">
                <div className="seller-avatar-small">{item.owner.charAt(0)}</div>
                <span className="seller-name">{item.owner}</span>
                <span className="seller-verified-badge" title="CIT Verified Student">
                  <IconShieldCheck size={13} />
                </span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

/* ==========================================================================
   Post Item View Component
   ========================================================================== */
function PostView({
  studentName,
  onAuth,
  onCreateListing,
}: {
  studentName: string | null
  onAuth: () => void
  onCreateListing: (listing: Omit<Listing, 'id' | 'postedAt'>) => void
}) {
  const [type, setType] = useState<ListingType>('Sell')
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [category, setCategory] = useState('Textbooks')
  const [price, setPrice] = useState('₱')
  const [condition, setCondition] = useState('Like new')
  const [area, setArea] = useState('Main Library')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  if (!studentName) {
    return (
      <div className="post-auth-required">
        <div className="auth-card-notice">
          <div className="auth-icon-circle">
            <IconShieldCheck size={32} />
          </div>
          <h2>Verified Student Account Required</h2>
          <p>Sign in with your campus credentials to list textbooks, calculators, and equipment on StudySwap.</p>
          <button className="btn-primary full-width" onClick={onAuth}>
            Sign In / Register
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onCreateListing({
      title: title.trim(),
      course: course.trim() || 'General Academic Resource',
      category,
      type,
      price: type === 'Free' ? 'Free' : type === 'Swap' ? 'Open to trade' : price.trim() || '₱0',
      condition,
      area,
      description: description.trim(),
      imageUrl: imageUrl.trim() || fallbackPhoto,
      owner: studentName || 'Student',
    })
  }

  return (
    <div className="post-container">
      <div className="post-form-card">
        <div className="form-header">
          <span className="section-eyebrow">POST A MATERIAL</span>
          <h1 className="form-title">List an Item on Campus</h1>
          <p className="form-subtitle">Make your past semester resources available to other students.</p>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          {/* Exchange Type Selection */}
          <div className="form-group">
            <label className="form-label">How would you like to pass this item on?</label>
            <div className="type-selector-grid">
              {[
                { type: 'Sell' as ListingType, label: 'Sell', desc: 'Set a fair cash price', icon: <IconTag size={18} /> },
                { type: 'Rent' as ListingType, label: 'Rent', desc: 'Lend for week / sem', icon: <IconClock size={18} /> },
                { type: 'Swap' as ListingType, label: 'Swap', desc: 'Trade for what you need', icon: <IconExchange size={18} /> },
                { type: 'Borrow' as ListingType, label: 'Borrow', desc: 'Lend for free use', icon: <IconBookOpen size={18} /> },
                { type: 'Free' as ListingType, label: 'Free', desc: 'Give away to classmates', icon: <IconGift size={18} /> },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.type}
                  className={`type-option-btn ${type === opt.type ? 'selected' : ''}`}
                  onClick={() => {
                    setType(opt.type)
                    if (opt.type === 'Free') setPrice('Free')
                    else if (opt.type === 'Swap') setPrice('Open to trade')
                    else if (price === 'Free' || price === 'Open to trade') setPrice('₱')
                  }}
                >
                  <div className="type-opt-icon">{opt.icon}</div>
                  <div className="type-opt-text">
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Course Code */}
          <div className="form-grid-two">
            <div className="form-group">
              <label className="form-label" htmlFor="post-title">Item Title *</label>
              <input
                id="post-title"
                type="text"
                className="form-input"
                required
                placeholder="e.g. Engineering Mechanics: Statics 5th Ed."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="post-course">Course Code / Subject Info</label>
              <input
                id="post-course"
                type="text"
                className="form-input"
                placeholder="e.g. CE 201 · 2nd Year Civil Eng"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="form-grid-two">
            <div className="form-group">
              <label className="form-label" htmlFor="post-category">Category</label>
              <select
                id="post-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Textbooks">Textbooks</option>
                <option value="Calculators">Calculators</option>
                <option value="Drafting & Art">Drafting & Art</option>
                <option value="Lab Equipment">Lab Equipment</option>
                <option value="General Academic">General Academic Supplies</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="post-price">
                {type === 'Rent' ? 'Rental Rate' : type === 'Sell' ? 'Selling Price' : 'Price / Terms'}
              </label>
              <input
                id="post-price"
                type="text"
                className="form-input"
                disabled={type === 'Free' || type === 'Swap'}
                placeholder={type === 'Rent' ? 'e.g. ₱35 / week' : 'e.g. ₱350'}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Condition & Meet-up Location */}
          <div className="form-grid-two">
            <div className="form-group">
              <label className="form-label" htmlFor="post-condition">Item Condition</label>
              <select
                id="post-condition"
                className="form-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Brand New">Brand New / Sealed</option>
                <option value="Like new">Like New</option>
                <option value="Good condition">Good Condition</option>
                <option value="Used with notes">Used with helpful notes</option>
                <option value="Fair condition">Fair Condition</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="post-area">Preferred Meetup Location on Campus</label>
              <select
                id="post-area"
                className="form-select"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="Main Library 2F">Main Library 2F Lobby</option>
                <option value="North Campus Canteen">North Campus Canteen</option>
                <option value="Engineering Building Lobby">Engineering Building Lobby</option>
                <option value="Science Hall 3F">Science Hall 3F</option>
                <option value="South Gate Entrance">South Gate Entrance</option>
                <option value="Student Activity Center">Student Activity Center</option>
              </select>
            </div>
          </div>

          {/* Image URL / Photo */}
          <div className="form-group">
            <label className="form-label" htmlFor="post-image">Photo URL (Optional)</label>
            <input
              id="post-image"
              type="url"
              className="form-input"
              placeholder="https://example.com/item-photo.jpg (leave blank for standard photo)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="post-desc">Additional Details</label>
            <textarea
              id="post-desc"
              rows={3}
              className="form-textarea"
              placeholder="Mention highlights, inclusion of accessories, edition details, or swap preferences..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions-row">
            <button type="submit" className="btn-primary full-width-mobile">
              <span>Publish Listing</span>
              <IconArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ==========================================================================
   Profile / Dashboard View Component
   ========================================================================== */
function ProfileView({
  studentName,
  savedListings,
  onSelect,
  onSave,
  onAuth,
  onInbox,
  onPost,
}: {
  studentName: string | null
  savedListings: Listing[]
  onSelect: (item: Listing) => void
  onSave: (id: number) => void
  onAuth: () => void
  onInbox: () => void
  onPost: () => void
}) {
  const [profileTab, setProfileTab] = useState<'saved' | 'requests' | 'listings'>('saved')

  if (!studentName) {
    return (
      <div className="profile-container">
        <div className="profile-auth-prompt">
          <div className="avatar-large">
            <IconUser size={36} />
          </div>
          <h1>Student Dashboard</h1>
          <p>Sign in to save materials, message sellers, and manage your campus exchanges.</p>
          <button className="btn-primary" onClick={onAuth}>
            Sign In with University Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Profile Header Card */}
      <div className="dashboard-header-card">
        <div className="profile-main-info">
          <div className="profile-avatar-circle">J</div>
          <div className="profile-text-block">
            <div className="profile-name-row">
              <h1 className="profile-name">{studentName}</h1>
              <span className="verified-pill">
                <IconShieldCheck size={14} /> CIT Verified Student
              </span>
            </div>
            <p className="profile-email">juan.delacruz@cit.edu · College of Engineering</p>
          </div>
        </div>

        <div className="profile-action-btns">
          <button className="btn-primary" onClick={onPost}>
            <IconPlus size={16} /> Post New Item
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box blue"><IconHeart size={20} /></div>
          <div>
            <strong className="metric-value">{savedListings.length}</strong>
            <span className="metric-label">Saved Materials</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box amber"><IconClock size={20} /></div>
          <div>
            <strong className="metric-value">2</strong>
            <span className="metric-label">Active Requests</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box emerald"><IconCheck size={20} /></div>
          <div>
            <strong className="metric-value">3</strong>
            <span className="metric-label">Completed Swaps</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-box purple"><IconTag size={20} /></div>
          <div>
            <strong className="metric-value">₱1,250</strong>
            <span className="metric-label">Estimated Savings</span>
          </div>
        </div>
      </div>

      {/* Profile Tabs Navigation */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${profileTab === 'saved' ? 'active' : ''}`}
          onClick={() => setProfileTab('saved')}
        >
          <IconHeart size={16} /> Saved Items ({savedListings.length})
        </button>
        <button
          className={`tab-btn ${profileTab === 'requests' ? 'active' : ''}`}
          onClick={() => setProfileTab('requests')}
        >
          <IconClock size={16} /> Active Exchanges (2)
        </button>
      </div>

      {/* Tab Content */}
      <div className="dashboard-tab-content">
        {profileTab === 'saved' && (
          <div>
            {savedListings.length === 0 ? (
              <div className="empty-tab-state">
                <IconHeart size={32} />
                <p>You haven't bookmarked any materials yet.</p>
              </div>
            ) : (
              <ListingGrid items={savedListings} onSelect={onSelect} saved={savedListings.map((s) => s.id)} onSave={onSave} />
            )}
          </div>
        )}

        {profileTab === 'requests' && (
          <div className="requests-list">
            <div className="request-item-card">
              <div className="req-status-tag pending">Waiting for Seller Response</div>
              <div className="req-body">
                <div>
                  <h3 className="req-title">Engineering Mechanics: Statics & Dynamics</h3>
                  <p className="req-meta">Seller: Miguel A. · Meetup: North Campus Library</p>
                </div>
                <button className="btn-secondary small" onClick={onInbox}>
                  <IconChat size={14} /> Open Chat
                </button>
              </div>
            </div>

            <div className="request-item-card">
              <div className="req-status-tag confirmed">Rental Confirmed · Reserved until Friday</div>
              <div className="req-body">
                <div>
                  <h3 className="req-title">Casio fx-991ES Plus II Scientific Calculator</h3>
                  <p className="req-meta">Owner: Anne L. · Rate: ₱35 / week</p>
                </div>
                <button className="btn-secondary small" onClick={onInbox}>
                  <IconChat size={14} /> View Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ==========================================================================
   Inbox View Component (Master-Detail on Mobile)
   ========================================================================== */
function InboxView({
  studentName,
  conversations,
  setConversations,
  activeId,
  setActiveId,
  mobileChatOpen,
  setMobileChatOpen,
  onAuth,
  onViewItem,
}: {
  studentName: string | null
  conversations: Conversation[]
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
  activeId: number
  setActiveId: (id: number) => void
  mobileChatOpen: boolean
  setMobileChatOpen: (val: boolean) => void
  onAuth: () => void
  onViewItem: (item: string) => void
}) {
  const [draft, setDraft] = useState('')

  if (!studentName) {
    return (
      <div className="inbox-container">
        <div className="inbox-auth-prompt">
          <div className="avatar-large"><IconChat size={36} /></div>
          <h1>Campus Messages</h1>
          <p>Sign in to contact verified students about listings, swaps, and campus meetups.</p>
          <button className="btn-primary" onClick={onAuth}>
            Sign In to Messages
          </button>
        </div>
      </div>
    )
  }

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0]

  const handleSelectConv = (id: number) => {
    setActiveId(id)
    setConversations((list) => list.map((c) => (c.id === id ? { ...c, unread: false } : c)))
    setMobileChatOpen(true)
  }

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault()
    const clean = draft.trim()
    if (!clean) return

    setConversations((list) =>
      list.map((c) =>
        c.id === activeConv.id
          ? {
              ...c,
              time: 'Just now',
              messages: [...c.messages, { from: 'You', text: clean, time: 'Just now' }],
            }
          : c
      )
    )
    setDraft('')
  }

  return (
    <div className="inbox-container">
      <div className="inbox-page-header">
        <div>
          <h1 className="inbox-title">Messages</h1>
          <p className="inbox-subtitle">Chat securely with verified campus students</p>
        </div>
      </div>

      <div className={`inbox-split-shell ${mobileChatOpen ? 'mobile-showing-chat' : 'mobile-showing-list'}`}>
        {/* Left: Conversations List */}
        <aside className="inbox-sidebar">
          <div className="conv-list-header">
            <span className="conv-count">{conversations.length} Conversations</span>
          </div>

          <div className="conv-list-scroll">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`conv-list-item ${conv.id === activeConv.id ? 'active' : ''}`}
                onClick={() => handleSelectConv(conv.id)}
              >
                <div className="conv-avatar">{conv.initial}</div>
                <div className="conv-item-content">
                  <div className="conv-row-top">
                    <strong className="conv-name">{conv.name}</strong>
                    <span className="conv-time">{conv.time}</span>
                  </div>
                  <span className="conv-item-pill">{conv.item}</span>
                  <p className="conv-last-msg">{conv.messages.at(-1)?.text}</p>
                </div>
                {conv.unread && <span className="unread-dot" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Right: Active Chat View */}
        <main className="chat-panel">
          {/* Mobile Back Button & Chat Header */}
          <header className="chat-header">
            <button
              className="mobile-back-to-list"
              onClick={() => setMobileChatOpen(false)}
              aria-label="Back to conversations list"
            >
              <IconArrowLeft size={20} />
            </button>

            <div className="chat-partner-info">
              <div className="chat-avatar">{activeConv.initial}</div>
              <div>
                <div className="partner-name-row">
                  <strong className="partner-name">{activeConv.name}</strong>
                  <span className="verified-icon-badge" title="CIT Verified Student">
                    <IconShieldCheck size={14} />
                  </span>
                </div>
                <span className="partner-status">CIT Verified Student · Active today</span>
              </div>
            </div>
          </header>

          {/* Context Ribbon showing Listing */}
          <div className="chat-item-context">
            <div className="context-left">
              <IconBookOpen size={18} className="context-icon" />
              <div>
                <strong className="context-title">{activeConv.item}</strong>
                <span className="context-price">{activeConv.itemPrice}</span>
              </div>
            </div>
            <button className="context-view-btn" onClick={() => onViewItem(activeConv.item)}>
              View Item
            </button>
          </div>

          {/* Messages Stream */}
          <div className="chat-thread-stream">
            <div className="chat-day-divider">
              <span>Today</span>
            </div>

            {activeConv.messages.map((msg, index) => {
              const isMine = msg.from === 'You'
              return (
                <div key={index} className={`chat-message-row ${isMine ? 'mine' : 'partner'}`}>
                  <div className="message-bubble">
                    <p className="message-text">{msg.text}</p>
                    <span className="message-timestamp">{msg.time}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Message Input Box */}
          <form className="chat-composer" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder={`Message ${activeConv.name}...`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" disabled={!draft.trim()} aria-label="Send message">
              <IconSend size={18} />
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

/* ==========================================================================
   Item Detail Modal Component (Mobile Bottom Sheet / Desktop Modal)
   ========================================================================== */
function ItemDetailModal({
  item,
  saved,
  onClose,
  onSave,
  onStartChat,
}: {
  item: Listing
  saved: boolean
  onClose: () => void
  onSave: () => void
  onStartChat: () => void
}) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="detail-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <IconClose size={20} />
        </button>

        <div className="detail-modal-grid">
          {/* Image Side */}
          <div className="modal-image-wrap">
            <img src={item.imageUrl} alt={item.title} className="modal-hero-img" onError={handleImageError} />
            <span className={`type-badge badge-${item.type.toLowerCase()}`}>{item.type}</span>
          </div>

          {/* Details Content */}
          <div className="modal-content-wrap">
            <div className="modal-header-row">
              <div className="modal-kicker-row">
                <span className="modal-category">{item.category}</span>
                <span className="modal-bullet">•</span>
                <span className="modal-course">{item.course}</span>
              </div>
              <button
                className={`modal-bookmark-btn ${saved ? 'is-saved' : ''}`}
                onClick={onSave}
                aria-label={saved ? 'Remove from saved' : 'Save item'}
              >
                <IconHeart size={20} filled={saved} />
              </button>
            </div>

            <h2 className="modal-title">{item.title}</h2>

            <div className="modal-price-tag">{item.price}</div>

            {/* Spec Chips */}
            <div className="modal-specs-row">
              <div className="spec-chip">
                <span className="spec-label">Condition</span>
                <strong className="spec-value">{item.condition}</strong>
              </div>
              <div className="spec-chip">
                <span className="spec-label">Campus Location</span>
                <strong className="spec-value">{item.area}</strong>
              </div>
            </div>

            {item.description && (
              <p className="modal-description">{item.description}</p>
            )}

            {/* Seller Box */}
            <div className="modal-seller-card">
              <div className="seller-avatar-med">{item.owner.charAt(0)}</div>
              <div className="seller-info-block">
                <div className="seller-title-row">
                  <strong>{item.owner}</strong>
                  <span className="seller-verified-chip">
                    <IconShieldCheck size={12} /> Verified
                  </span>
                </div>
                <span className="seller-subtext">CIT Campus Student</span>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action-row">
              <button className="btn-primary full-width" onClick={onStartChat}>
                <IconChat size={18} />
                <span>Message Seller / Request Swap</span>
              </button>
            </div>

            <div className="modal-safety-tip">
              <IconShieldCheck size={14} />
              <span>Meet up safely at designated on-campus public locations.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   Auth Modal Component
   ========================================================================== */
function AuthModal({
  mode,
  onClose,
  onSwitch,
  onSuccess,
}: {
  mode: 'signin' | 'signup'
  onClose: () => void
  onSwitch: () => void
  onSuccess: (name: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isSignUp = mode === 'signup'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSuccess('Juan Dela Cruz')
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <IconClose size={20} />
        </button>

        <div className="auth-modal-header">
          <div className="auth-brand-badge">
            <IconShieldCheck size={16} /> Campus Access
          </div>
          <h2 className="auth-modal-title">
            {isSignUp ? 'Create your student account' : 'Welcome back'}
          </h2>
          <p className="auth-modal-subtitle">
            {isSignUp
              ? 'Join fellow verified students sharing textbooks & academic materials.'
              : 'Sign in to manage your campus exchanges and messages.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal-form">
          {isSignUp && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Full Name</label>
              <input id="auth-name" type="text" required placeholder="Juan Dela Cruz" className="form-input" />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">University Email (@cit.edu)</label>
            <input
              id="auth-email"
              type="email"
              required
              placeholder="juan.delacruz@cit.edu"
              defaultValue={!isSignUp ? 'juan.delacruz@cit.edu' : ''}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">Password</label>
            <div className="password-input-wrap">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="Enter your password"
                defaultValue={!isSignUp ? 'StudySwap2026' : ''}
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary full-width auth-submit-btn">
            {isSignUp ? 'Create Verified Account' : 'Sign In'}
          </button>
        </form>

        <div className="demo-login-box">
          <span className="demo-tag">Quick Demo Testing</span>
          <button
            type="button"
            className="btn-demo-quick"
            onClick={() => onSuccess('Juan Dela Cruz')}
          >
            Sign in as Demo Student (Juan Dela Cruz)
          </button>
        </div>

        <div className="auth-switch-footer">
          <span>{isSignUp ? 'Already have an account?' : 'New to StudySwap?'}</span>{' '}
          <button type="button" className="auth-switch-link" onClick={onSwitch}>
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
