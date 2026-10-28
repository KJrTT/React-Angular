import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../api/posts';
import PostForm from '../components/PostForm';

