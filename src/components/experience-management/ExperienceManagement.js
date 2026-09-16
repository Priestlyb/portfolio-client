import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { axiosInstance } from "../../config";
import "../../constants/styles/experience-management.css";

/* =========================================================
   SORTABLE EXPERIENCE ITEM
========================================================= */

function SortableExperience({ experience, index, onDelete, deleting }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: experience._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`admin_experience_item ${
        isDragging ? "admin_experience_item_dragging" : ""
      }`}
    >
      {/* INDEX */}
      <div className="admin_experience_index">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* DRAG HANDLE */}
      <button
        type="button"
        className="admin_experience_drag"
        {...attributes}
        {...listeners}
        aria-label={`Reorder ${experience.title} at ${experience.company}`}
        title="Drag to reorder"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* LOGO */}
      <div className="admin_experience_logo">
        {experience.logo ? (
          <img src={experience.logo} alt={`${experience.company} logo`} />
        ) : (
          <span>{experience.company?.charAt(0)?.toUpperCase() || "?"}</span>
        )}
      </div>

      {/* INFORMATION */}
      <div className="admin_experience_info">
        <div className="admin_experience_heading">
          <h3>{experience.title}</h3>

          <span className="admin_experience_type">{experience.type}</span>
        </div>

        <div className="admin_experience_meta">
          <span>{experience.company}</span>
          <span>•</span>
          <span>{experience.location}</span>
          <span>•</span>
          <span>{experience.period}</span>
        </div>

        <span className="admin_experience_duties">
          {experience.duties?.length || 0} KEY CONTRIBUTION
          {experience.duties?.length === 1 ? "" : "S"}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="admin_experience_actions">
        <Link
          to={`/admin/experience/edit/${experience._id}`}
          className="admin_experience_edit"
        >
          EDIT <span>↗</span>
        </Link>

        <button
          type="button"
          className="admin_experience_delete"
          onClick={() => onDelete(experience._id)}
          disabled={deleting === experience._id}
        >
          {deleting === experience._id ? "DELETING..." : "DELETE"}
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   EXPERIENCE MANAGEMENT
========================================================= */

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [hasOrderChanges, setHasOrderChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  /* =========================================================
     FETCH EXPERIENCES
  ========================================================= */

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.get("/experiences", {
        withCredentials: true,
      });

      const fetchedExperiences = res.data?.experiences || [];

      setExperiences(fetchedExperiences);
      setHasOrderChanges(false);
    } catch (err) {
      console.error("Failed to fetch experiences:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load the experience database.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  /* =========================================================
     DRAG END
  ========================================================= */

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setExperiences((currentExperiences) => {
      const oldIndex = currentExperiences.findIndex(
        (experience) => experience._id === active.id,
      );

      const newIndex = currentExperiences.findIndex(
        (experience) => experience._id === over.id,
      );

      if (oldIndex === -1 || newIndex === -1) {
        return currentExperiences;
      }

      return arrayMove(currentExperiences, oldIndex, newIndex);
    });

    setHasOrderChanges(true);
    setSuccess("");
    setError("");
  };

  /* =========================================================
     SAVE ORDER
  ========================================================= */

  const saveOrder = async () => {
    if (!experiences.length || !hasOrderChanges) {
      return;
    }

    try {
      setSavingOrder(true);
      setError("");
      setSuccess("");

      const payload = {
        experiences: experiences.map((experience) => ({
          _id: experience._id,
        })),
      };

      const res = await axiosInstance.patch("/experiences/reorder", payload, {
        withCredentials: true,
      });

      const updatedExperiences = res.data?.experiences || experiences;

      setExperiences(updatedExperiences);
      setHasOrderChanges(false);
      setSuccess("Experience order updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error("Failed to save experience order:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save the new experience order.",
      );
    } finally {
      setSavingOrder(false);
    }
  };

  /* =========================================================
     DELETE EXPERIENCE
  ========================================================= */

  const handleDelete = async (experienceId) => {
    const experience = experiences.find((item) => item._id === experienceId);

    if (!experience) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${experience.title}" at "${experience.company}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(experienceId);
      setError("");
      setSuccess("");

      await axiosInstance.delete(`/experiences/${experienceId}`, {
        withCredentials: true,
      });

      setExperiences((currentExperiences) =>
        currentExperiences.filter((item) => item._id !== experienceId),
      );

      setHasOrderChanges(false);
      setSuccess("Experience deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error("Failed to delete experience:", err);

      setError(
        err.response?.data?.message || "Unable to delete this experience.",
      );
    } finally {
      setDeleting(null);
    }
  };

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <section className="admin_experience_management">
        <div className="admin_projects_header">
          <div>
            <p>02 — EXPERIENCE DATABASE</p>
            <h2>EXPERIENCE MANAGEMENT</h2>
          </div>

          <span>FETCHING RECORDS...</span>
        </div>

        <div className="admin_loading">
          <div className="admin_loading_line"></div>
          <span>LOADING EXPERIENCE DATABASE...</span>
        </div>
      </section>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="admin_experience_management">
      {/* HEADER */}
      <div className="admin_projects_header">
        <div>
          <p>02 — EXPERIENCE DATABASE</p>
          <h2>EXPERIENCE MANAGEMENT</h2>
        </div>

        <span>
          {experiences.length} EXPERIENCE
          {experiences.length === 1 ? "" : "S"}
        </span>
      </div>

      {/* STATUS MESSAGES */}
      {error && (
        <div className="admin_form_message admin_form_error">
          <span>!</span>

          <p>{error}</p>

          <button type="button" onClick={fetchExperiences}>
            TRY AGAIN ↗
          </button>
        </div>
      )}

      {success && (
        <div className="admin_form_message admin_form_success">
          <span>✓</span>
          <p>{success}</p>
        </div>
      )}

      {/* DATABASE */}
      {experiences.length > 0 ? (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={experiences.map((experience) => experience._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="admin_experience_list">
                {experiences.map((experience, index) => (
                  <SortableExperience
                    key={experience._id}
                    experience={experience}
                    index={index}
                    onDelete={handleDelete}
                    deleting={deleting}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* ORDER CONTROLS */}
          <div className="admin_experience_order_bar">
            <div>
              <span className="admin_experience_order_indicator"></span>

              <div>
                <strong>
                  {hasOrderChanges
                    ? "UNSAVED ORDER CHANGES"
                    : "ORDER SYNCHRONIZED"}
                </strong>

                <small>Drag experiences to change their display order.</small>
              </div>
            </div>

            <button
              type="button"
              className="admin_save_order"
              onClick={saveOrder}
              disabled={!hasOrderChanges || savingOrder}
            >
              {savingOrder ? (
                <>
                  <span className="admin_submit_spinner"></span>
                  SAVING ORDER...
                </>
              ) : (
                <>
                  SAVE ORDER
                  <span>↗</span>
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        /* EMPTY STATE */
        <div className="admin_state admin_empty">
          <span className="admin_state_number">00</span>

          <div>
            <h3>No experiences yet.</h3>

            <p>
              Your experience database is currently empty. Create your first
              career record to get started.
            </p>

            <Link to="/admin/experience/add" className="admin_retry">
              CREATE FIRST EXPERIENCE ↗
            </Link>
          </div>
        </div>
      )}

      {/* ADD EXPERIENCE */}
      {experiences.length > 0 && (
        <div className="admin_experience_add">
          <Link to="/admin/experience/add" className="admin_add_btn">
            <button type="button" className="admin_btn">
              <span className="admin_btn_icon">+</span>
              <span>ADD EXPERIENCE</span>
              <span className="admin_btn_arrow">↗</span>
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
